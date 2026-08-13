import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="glass p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Entrar</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-surface-secondary border border-surface-secondary rounded-md text-white"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-surface-secondary border border-surface-secondary rounded-md text-white"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full">Entrar</Button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Não tem conta?{' '}
          <Link to="/registro" className="text-accent hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}