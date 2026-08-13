import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-secondary mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-white">GlobalMove</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforme o sonho de morar fora em um plano.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><Link to="/destinos" className="text-gray-400 hover:text-accent text-sm">Destinos</Link></li>
              <li><Link to="/comparar" className="text-gray-400 hover:text-accent text-sm">Comparar</Link></li>
              <li><Link to="/simulador" className="text-gray-400 hover:text-accent text-sm">Simulador</Link></li>
              <li><Link to="/metas" className="text-gray-400 hover:text-accent text-sm">Metas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-accent text-sm">Blog</Link></li>
              <li><Link to="/guias" className="text-gray-400 hover:text-accent text-sm">Guias</Link></li>
              <li><Link to="/vistos" className="text-gray-400 hover:text-accent text-sm">Vistos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-gray-400 hover:text-accent text-sm">Sobre</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-accent text-sm">Contato</Link></li>
              <li><Link to="/privacidade" className="text-gray-400 hover:text-accent text-sm">Privacidade</Link></li>
              <li><Link to="/termos" className="text-gray-400 hover:text-accent text-sm">Termos</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-secondary mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 GlobalMove. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}