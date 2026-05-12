import { useState, useCallback, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'
import AIChatbot from './components/AIChatbot'
import OfflineWarning from './components/OfflineWarning'
import Login from './components/Login'
import { generateSecurePassword } from './utils/passwordGenerator'
import { analyzePassword } from './utils/securityAnalyzer'
import { encryptPassword } from './utils/encryption'
import { getAIRecommendations } from './services/aiRecommendations'
import { validatePasswordConfig } from './utils/validation'
import { validateVaultData } from './utils/integrityChecker'
import { db, auth } from './firebase/firebase'
import { ref, push, onValue, query, limitToLast, serverTimestamp } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [history, setHistory] = useState([])
  const [toast, setToast] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isAILoading, setIsAILoading] = useState(false)
  const [aiInsights, setAiInsights] = useState(null)

  const [config, setConfig] = useState({
    mode: 'STANDARD',
    length: 16,
    useNumbers: true,
    useSymbols: true,
    useUpper: true,
    excludeAmbiguous: false
  });

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        setIsLoginOpen(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load history - Scoped if logged in, empty otherwise
  useEffect(() => {
    if (!db || !user) {
      setHistory([]);
      return;
    }
    
    const historyRef = query(ref(db, `users/${user.uid}/passwords`), limitToLast(20));
    
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const rawDocs = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const validatedDocs = validateVaultData(rawDocs).reverse();
        setHistory(validatedDocs);
      } else {
        setHistory([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleGenerate = useCallback(async () => {
    const { isValid, errors } = validatePasswordConfig(config);
    if (!isValid) {
      setToast({ message: errors[0], type: 'error' });
      return;
    }

    const newPass = generateSecurePassword(config);
    const newAnalysis = analyzePassword(newPass);
    
    setCurrentPassword(newPass);
    setAnalysis(newAnalysis);
    
    // Only save to DB if user is authenticated
    if (user && db) {
      setIsSaving(true);
      try {
        const encrypted = encryptPassword(newPass);
        const passwordsRef = ref(db, `users/${user.uid}/passwords`);
        await push(passwordsRef, {
          encryptedPassword: encrypted,
          securityScore: newAnalysis.score,
          securityLevel: newAnalysis.level,
          entropy: newAnalysis.entropy,
          analysisDetails: newAnalysis.metrics,
          createdAt: serverTimestamp()
        });
        setToast({ message: 'Sync Successful', type: 'success' });
      } catch (error) {
        console.error("Storage Error:", error.message);
        setToast({ message: 'Sync Failed. Data not persisted.', type: 'error' });
      } finally {
        setIsSaving(false);
      }
    }

    setIsAILoading(true);
    try {
      const insights = await getAIRecommendations({
        score: newAnalysis.score,
        level: newAnalysis.level,
        entropy: newAnalysis.entropy,
        hasSymbols: config.useSymbols,
        hasNumbers: config.useNumbers,
        repeatedPatterns: !newAnalysis.metrics.find(m => m.label.includes('Patrones'))?.ok || false
      });
      setAiInsights(insights);
    } catch (error) {
      console.error("AI Insight Error:", error.message);
    } finally {
      setIsAILoading(false);
    }
  }, [config, user]);

  const handlePopulateDemo = async () => {
    if (!user) return;
    setToast({ message: 'Initializing Demo Sequence...', type: 'success' });
    try {
      const demoData = [{ score: 9.8, level: 'STRONG', length: 32 }, { score: 4.2, level: 'MEDIUM', length: 12 }, { score: 8.5, level: 'STRONG', length: 24 }, { score: 2.1, level: 'WEAK', length: 8 }];
      for (const item of demoData) {
        const p = generateSecurePassword({ length: item.length });
        await push(ref(db, `users/${user.uid}/passwords`), {
          encryptedPassword: encryptPassword(p),
          securityScore: item.score,
          securityLevel: item.level,
          entropy: Math.floor(item.length * 5.2),
          createdAt: serverTimestamp()
        });
      }
      setToast({ message: 'Demo Matrix Populated', type: 'success' });
    } catch (err) {
      setToast({ message: 'Population failed.', type: 'error' });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">Establishing Secure Link</p>
      </div>
    )
  }

  // Mandatory Login View — shown when no user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-[#030303]">
        <Login isOpen={true} onClose={() => {}} />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    )
  }

  return (
    <MainLayout user={user} onLoginClick={() => setIsLoginOpen(true)}>
      <Hero />
      <Dashboard 
        password={currentPassword} 
        analysis={analysis} 
        history={history}
        onGenerate={handleGenerate}
        isSaving={isSaving}
        isAILoading={isAILoading}
        aiInsights={aiInsights}
        config={config}
        setConfig={setConfig}
        onPopulateDemo={handlePopulateDemo}
        isGuest={false}
      />
      
      <AIChatbot />
      <OfflineWarning />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </MainLayout>
  )
}

export default App
