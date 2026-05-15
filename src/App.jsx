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
import { ref, push, onValue, query, limitToLast } from 'firebase/database'
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

  // Sync offline queue
  const syncOfflineQueue = useCallback(async () => {
    if (!user || !db) return;
    const queueKey = `offline_queue_${user.uid}`;
    
    const getQueue = () => {
      try {
        const q = JSON.parse(localStorage.getItem(queueKey));
        return Array.isArray(q) ? q : [];
      } catch(e) {
        return [];
      }
    };
    
    const queue = getQueue();
    if (queue.length === 0) return;

    const passwordsRef = ref(db, `users/${user.uid}/passwords`);
    let synced = 0;

    for (const item of queue) {
      try {
        await push(passwordsRef, item);
        synced++;
      } catch (err) {
        console.error("Error al sincronizar cola offline (Rollback):", err);
      } finally {
        const currentQueue = getQueue();
        localStorage.setItem(queueKey, JSON.stringify(currentQueue.filter(qItem => qItem.createdAt !== item.createdAt)));
      }
    }

    if (synced > 0) {
      setToast({ message: `Sincronización completada: ${synced} contraseñas subidas`, type: 'success' });
    }
  }, [user]);

  // Sincronizar al iniciar sesión o recuperar conexión
  useEffect(() => {
    if (user) {
      syncOfflineQueue();
    }
    
    const handleOnline = () => {
      if (user) syncOfflineQueue();
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [user, syncOfflineQueue]);

  // Cargar historial — solo si el usuario está autenticado
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

    // Solo guardar en la base de datos si el usuario está autenticado
    if (user && db) {
      setIsSaving(true);
      
      const newEntry = {
        encryptedPassword: encryptPassword(newPass),
        securityScore: newAnalysis.score,
        securityLevel: newAnalysis.level,
        entropy: newAnalysis.entropy,
        analysisDetails: newAnalysis.metrics,
        createdAt: Date.now() // Usamos hora local para persistencia offline
      };

      // Helper seguro para localStorage
      const queueKey = `offline_queue_${user.uid}`;
      const getSafeQueue = () => {
        try {
          const q = JSON.parse(localStorage.getItem(queueKey));
          return Array.isArray(q) ? q : [];
        } catch(e) {
          return [];
        }
      };

      // 1. Rollback System: Guardar en cola offline primero (Optimistic UI)
      const currentQueue = getSafeQueue();
      currentQueue.push(newEntry);
      localStorage.setItem(queueKey, JSON.stringify(currentQueue));

      const passwordsRef = ref(db, `users/${user.uid}/passwords`);
      
      // No bloqueamos la UI. Si hay conexión sube rápido, si no, se queda en cola local de Firebase
      push(passwordsRef, newEntry)
        .then(() => {
          // 2. Si sube bien, lo quitamos de la cola persistente
          const updatedQueue = getSafeQueue();
          localStorage.setItem(queueKey, JSON.stringify(updatedQueue.filter(item => item.createdAt !== newEntry.createdAt)));
          setToast({ message: 'Contraseña guardada en la nube', type: 'success' });
        })
        .catch((error) => {
          console.error("Error al guardar:", error);
          // 3. Rollback: Si hay un error de validación/permisos, revertimos la inserción local
          const updatedQueue = getSafeQueue();
          localStorage.setItem(queueKey, JSON.stringify(updatedQueue.filter(item => item.createdAt !== newEntry.createdAt)));
          setToast({ message: 'Error al guardar. Permisos denegados (Rollback).', type: 'error' });
        });

      // Liberamos la UI inmediatamente para mejor experiencia
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
      console.error("Error IA:", error.message);
    } finally {
      setIsAILoading(false);
    }
  }, [config, user]);



  // Pantalla de carga inicial mientras se verifica la sesión
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Verificando sesión...</p>
        </div>
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
        isGuest={!user}
      />

      <AIChatbot />
      <OfflineWarning />

      {/* Modal de login — opcional, no bloquea el dashboard */}
      {isLoginOpen && (
        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}

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
