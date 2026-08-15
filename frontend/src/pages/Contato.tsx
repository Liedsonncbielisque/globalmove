import { useState } from 'react';
import { Mail, MessageSquare, Send, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar com backend ou serviço de e-mail (ex: Resend, Formspree)
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-5">
              <MessageSquare className="h-7 w-7 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Fale com a gente</h1>
            <p className="text-gray-400">
              Tem dúvidas, sugestões ou quer saber mais sobre a plataforma?
              Responderemos em até 2 dias úteis.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="glass p-5 rounded-xl flex items-center gap-4">
              <Mail className="h-6 w-6 text-accent shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">E-mail</p>
                <a href="mailto:contato@globalmove.com.br" className="text-white text-sm hover:text-accent transition-colors">
                  contato@globalmove.com.br
                </a>
              </div>
            </div>
            <div className="glass p-5 rounded-xl flex items-center gap-4">
              <Globe className="h-6 w-6 text-accent-secondary shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Site</p>
                <span className="text-white text-sm">globalmove.com.br</span>
              </div>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="glass p-10 rounded-2xl text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-semibold text-white mb-2">Mensagem enviada!</h2>
              <p className="text-gray-400">
                Obrigado por entrar em contato. Responderemos em breve.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setSent(false); }}
              >
                Enviar outra mensagem
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5" htmlFor="name">Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full bg-surface-secondary border border-surface-secondary rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5" htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full bg-surface-secondary border border-surface-secondary rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5" htmlFor="subject">Assunto</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-surface-secondary border border-surface-secondary rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                >
                  <option value="" disabled>Selecione um assunto</option>
                  <option value="duvida">Dúvida sobre a plataforma</option>
                  <option value="sugestao">Sugestão de melhoria</option>
                  <option value="bug">Reportar problema técnico</option>
                  <option value="parceria">Parceria ou colaboração</option>
                  <option value="imprensa">Imprensa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5" htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full bg-surface-secondary border border-surface-secondary rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Enviar mensagem
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Ao enviar, você concorda com nossa{' '}
                <a href="/privacidade" className="text-accent hover:underline">Política de Privacidade</a>.
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
