import { useState, useCallback, useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Toast from './components/Toast'
import { generateSecurePassword } from './utils/passwordGenerator'
import { analyzePassword } from './utils/securityAnalyzer'
import { encryptPassword } from './utils/encryption'
import { db } from './firebase/firebase'
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore'

function App() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [history, setHistory] = useState([])
  const [toast, setToast] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Load history from Firebase Real-time
  useEffect(() => {
    if (!db) return; // Guard clause for uninitialized DB
    
    try {
      const q = query(collection(db, "passwords"), orderBy("createdAt", "desc"), limit(10));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setHistory(docs);
      }, (error) => {
        console.warn("Firestore listener error:", error);
      });
      return () => unsubscribe();
    } catch (error) {
      console.warn("Firebase not configured correctly. Using local state only.");
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    const newPass = generateSecurePassword(18);
    const newAnalysis = analyzePassword(newPass);
    
    setCurrentPassword(newPass);
    setAnalysis(newAnalysis);
    
    // START PHASE 3: Encryption & Remote Storage
    setIsSaving(true);
    try {
      const encrypted = encryptPassword(newPass);
      
      // Attempt to save to Firebase
      if (db) {
        await addDoc(collection(db, "passwords"), {
          encryptedPassword: encrypted,
          securityScore: newAnalysis.score,
          securityLevel: newAnalysis.level,
          entropy: newAnalysis.entropy,
          analysisDetails: newAnalysis.metrics,
          createdAt: serverTimestamp()
        });
        setToast({ message: 'Saved Securely to Cloud', type: 'success' });
      }
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      setToast({ message: 'Local Save Only (Firebase Config Missing)', type: 'error' });
      
      // Fallback for local history if Firebase fails
      const newEntry = {
        id: Date.now(),
        createdAt: new Date(),
        securityScore: newAnalysis.score,
        securityLevel: newAnalysis.level,
        entropy: newAnalysis.entropy
      }
      setHistory(prev => [newEntry, ...prev].slice(0, 10));
    } finally {
      setIsSaving(false);
    }
  }, []);

  return (
    <MainLayout>
      <Hero />
      <Dashboard 
        password={currentPassword} 
        analysis={analysis} 
        history={history}
        onGenerate={handleGenerate}
        isSaving={isSaving}
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
