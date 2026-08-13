import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Country {
  id: string;
  name: string;
  iso_code: string;
  flag: string;
  continent: string;
  currency: string;
  population: number;
}

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data } = await axios.get('/api/countries');
        setCountries(data.data.countries || []);
      } catch (err) {
        setError('Não foi possível carregar os destinos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Explorar Destinos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="glass p-6 rounded-lg animate-pulse">
                <div className="h-8 bg-surface-secondary rounded mb-4" />
                <div className="h-4 bg-surface-secondary rounded mb-2" />
                <div className="h-4 bg-surface-secondary rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass p-12 rounded-xl">
            <p className="text-error text-lg mb-4">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-accent text-background rounded-md font-medium"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Explorar Destinos</h1>
            <p className="text-gray-400 mt-2">{countries.length} países disponíveis</p>
          </div>
          <input
            type="search"
            placeholder="Buscar país..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 bg-surface-secondary border border-surface-secondary rounded-md text-white focus:border-accent focus:outline-none w-full md:w-64"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="glass p-12 rounded-xl text-center">
            <p className="text-gray-400">Nenhum país encontrado para "{filter}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((country) => (
              <Link
                key={country.id}
                to={`/destinos/${country.iso_code.toLowerCase()}`}
                className="glass p-6 rounded-lg hover:border-accent/50 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-sm text-gray-400">{country.continent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {(country.population / 1000000).toFixed(1)}M
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {country.currency}
                  </span>
                </div>
                <div className="flex items-center text-accent text-sm font-medium">
                  Ver detalhes
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}