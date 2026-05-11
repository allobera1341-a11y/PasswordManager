import { useState, useCallback, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'
import { generateSecurePassword } from './utils/passwordGenerator'
import { analyzePassword } from './utils/securityAnalyzer'
import { encryptPassword } from './utils/encryption'
import { getAIRecommendations } from './services/aiRecommendations'
import { validatePasswordConfig } from './utils/validation'
import { db } from './firebase/firebase'
import { ref, push, onValue, query, limitToLast, serverTimestamp } from 'firebase/database'

function App() {
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

  // Phase 5: Load history from Firebase Realtime Database
  useEffect(() => {
    if (!db) return;
    
    const historyRef = query(ref(db, 'passwords'), limitToLast(20));
    
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // RTDB returns an object of objects, convert to array and reverse for newest first
        const docs = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse();
        setHistory(docs);
      } else {
        setHistory([]);
      }
    }, (error) => {
      console.error("Firebase RTDB Error:", error.message);
      setToast({ message: 'Database connection failed. Check RTDB Rules.', type: 'error' });
    });

    return () => unsubscribe();
  }, []);

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
    
    setIsSaving(true);
    try {
      const encrypted = encryptPassword(newPass);
      if (db) {
        const passwordsRef = ref(db, 'passwords');
        await push(passwordsRef, {
          encryptedPassword: encrypted,
          securityScore: newAnalysis.score,
          securityLevel: newAnalysis.level,
          entropy: newAnalysis.entropy,
          analysisDetails: newAnalysis.metrics,
          createdAt: serverTimestamp() // RTDB server timestamp
        });
        setToast({ message: 'Identity Secured in RTDB', type: 'success' });
      }
    } catch (error) {
      console.error("Storage Error:", error.message);
      setToast({ message: 'Storage blocked. Check Security Rules.', type: 'error' });
    } finally {
      setIsSaving(false);
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
  }, [config]);

  const handlePopulateDemo = async () => {
    setToast({ message: 'Initializing Demo Sequence...', type: 'success' });
    try {
      const demoData = [
        { score: 9.8, level: 'STRONG', length: 32 },
        { score: 4.2, level: 'MEDIUM', length: 12 },
        { score: 8.5, level: 'STRONG', length: 24 },
        { score: 2.1, level: 'WEAK', length: 8 },
      ];

      for (const item of demoData) {
        const p = generateSecurePassword({ length: item.length });
        await push(ref(db, 'passwords'), {
          encryptedPassword: encryptPassword(p),
          securityScore: item.score,
          securityLevel: item.level,
          entropy: Math.floor(item.length * 5.2),
          createdAt: serverTimestamp()
        });
      }
      setToast({ message: 'Demo Matrix Populated', type: 'success' });
    } catch (err) {
      setToast({ message: 'Population failed. Check RTDB permissions.', type: 'error' });
    }
  };

  return (
    <MainLayout>
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
      />
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
