import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Shield, Brain, Minimize2 } from 'lucide-react';
import { askCyberAI } from '../services/aiRecommendations';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello. I am the AI Secure Intelligence Assistant. How can I assist with your vault security today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await askCyberAI(userMessage, messages.slice(-5));
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Uplink error. Please retry.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[380px] h-[500px] card-base flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-blue-500/20 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="card-header bg-blue-600/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white tracking-tight leading-none">Security Expert</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">AI Live Uplink</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide bg-black/40">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/[0.05] border border-white/[0.05] text-slate-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.05] border border-white/[0.05] p-3.5 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white/[0.02] border-t border-white/[0.05] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about encryption, entropy..."
              className="flex-grow bg-black/40 border border-white/[0.05] rounded-xl px-4 py-2.5 text-[13px] text-white focus:outline-none focus:border-blue-500/50 transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-500 transition-all disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-500 shadow-2xl active:scale-95 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
        )}
      </button>
    </div>
  );
};

export default AIChatbot;
