import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Brain } from 'lucide-react';
import { askCyberAI } from '../services/aiRecommendations';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hola. Soy el asistente de seguridad. ¿En qué puedo ayudarte hoy?' }
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Por favor, inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Ventana de chat */}
      {isOpen && (
        <div
          className="mb-3 w-[360px] flex flex-col rounded-xl overflow-hidden"
          style={{
            height: '460px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Cabecera */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <Brain size={15} />
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Asistente de seguridad</h3>
                <p className="text-xs font-medium" style={{ color: 'var(--success)' }}>En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <X size={15} />
            </button>
          </div>

          {/* Área de mensajes */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-3" style={{ background: 'var(--bg)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] px-4 py-2.5 rounded-xl text-sm leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? { background: 'var(--accent)', color: '#fff', borderBottomRightRadius: '4px' }
                      : { background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderBottomLeftRadius: '4px' }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: 'var(--border-strong)', animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="px-4 py-3 flex gap-2"
            style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre cifrado, entropía..."
              className="flex-grow text-sm px-3 py-2 rounded-lg outline-none transition-colors"
              style={{
                background: 'var(--surface-3)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40"
              style={{ background: 'var(--accent)', color: '#fff' }}
              onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all active:scale-95"
        style={{
          background: isOpen ? 'var(--text-secondary)' : 'var(--accent)',
          boxShadow: 'var(--shadow-md)',
        }}
        onMouseEnter={e => !isOpen && (e.currentTarget.style.background = 'var(--accent-hover)')}
        onMouseLeave={e => e.currentTarget.style.background = isOpen ? 'var(--text-secondary)' : 'var(--accent)'}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
    </div>
  );
};

export default AIChatbot;
