import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o GlobalMove AI. Posso ajudar você com informações sobre destinos, custos, vistos e prazos. Como posso ajudar?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/ai/ask', {
        question: input,
        context: {},
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Tente novamente.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
            <Bot className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">GlobalMove AI</h1>
            <p className="text-gray-400 text-sm">Seu assistente de planejamento migratório</p>
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-accent text-background'
                      : 'bg-surface-secondary text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-secondary p-4 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-surface-secondary p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte sobre destinos, custos, vistos..."
                className="flex-1 px-4 py-2.5 bg-surface-secondary border border-surface-secondary rounded-md text-white focus:border-accent focus:outline-none"
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              A IA usa apenas dados disponíveis no sistema. Nunca inventa informações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}