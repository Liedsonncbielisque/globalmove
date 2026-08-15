import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/destinos', label: 'Destinos' },
    { to: '/comparar', label: 'Comparar' },
    { to: '/simulador', label: 'Simulador' },
    { to: '/blog', label: 'Blog' },
    { to: '/ai', label: 'IA' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-surface-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileOpen(false)}>
            <Globe className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-white">GlobalMove</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  isActive(link.to)
                    ? 'text-accent font-medium'
                    : 'text-gray-300 hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/onboarding">Começar Análise</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-surface-secondary px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(link.to)
                  ? 'text-accent bg-accent/10 font-medium'
                  : 'text-gray-300 hover:text-white hover:bg-surface-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-surface-secondary space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/login" onClick={() => setMobileOpen(false)}>Entrar</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link to="/onboarding" onClick={() => setMobileOpen(false)}>Começar Análise</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
