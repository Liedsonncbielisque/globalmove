import { Link } from 'react-router-dom';
import { Globe, Menu } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-surface-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-white">GlobalMove</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/destinos" className="text-gray-300 hover:text-accent transition-colors">
              Destinos
            </Link>
            <Link to="/comparar" className="text-gray-300 hover:text-accent transition-colors">
              Comparar
            </Link>
            <Link to="/simulador" className="text-gray-300 hover:text-accent transition-colors">
              Simulador
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-accent transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/onboarding">Começar Análise</Link>
            </Button>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}