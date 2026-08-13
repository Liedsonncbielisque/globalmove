import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Compare() {
  const [countries, setCountries] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data } = await axios.get('/api/countries');
        setCountries(data.data.countries || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const toggleCountry = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  };

  const selectedCountries = countries.filter((c) => selected.includes(c.id));

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="glass p-12 rounded-xl animate-pulse">
            <div className="h-8 bg-surface-secondary rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Comparar Destinos</h1>
        <p className="text-gray-400 mb-8">Selecione até 4 países para comparar lado a lado.</p>

        {/* Selector */}
        <div className="glass p-6 rounded-lg mb-8">
          <div className="flex flex-wrap gap-3">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => toggleCountry(country.id)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selected.includes(country.id)
                    ? 'bg-accent/20 border-accent text-white'
                    : 'bg-surface-secondary border-surface-secondary text-gray-300 hover:border-accent/50'
                }`}
              >
                {country.flag} {country.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison */}
        {selectedCountries.length === 0 ? (
          <div className="glass p-12 rounded-xl text-center">
            <p className="text-gray-400">Selecione pelo menos um país para comparar</p>
          </div>
        ) : (
          <div className="glass rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-surface-secondary">
                  <th className="text-left p-4 text-gray-400 font-medium">Indicador</th>
                  {selectedCountries.map((c) => (
                    <th key={c.id} className="p-4 text-center">
                      <span className="text-2xl block mb-1">{c.flag}</span>
                      <span className="text-white font-semibold">{c.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-surface-secondary">
                  <td className="p-4 text-gray-400">Continente</td>
                  {selectedCountries.map((c) => (
                    <td key={c.id} className="p-4 text-center text-white">{c.continent}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-secondary">
                  <td className="p-4 text-gray-400">Moeda</td>
                  {selectedCountries.map((c) => (
                    <td key={c.id} className="p-4 text-center text-white">{c.currency}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-secondary">
                  <td className="p-4 text-gray-400">Idioma</td>
                  {selectedCountries.map((c) => (
                    <td key={c.id} className="p-4 text-center text-white">{c.language}</td>
                  ))}
                </tr>
                <tr className="border-b border-surface-secondary">
                  <td className="p-4 text-gray-400">População</td>
                  {selectedCountries.map((c) => (
                    <td key={c.id} className="p-4 text-center text-white">
                      {(c.population / 1000000).toFixed(1)}M
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-gray-400">Capital</td>
                  {selectedCountries.map((c) => (
                    <td key={c.id} className="p-4 text-center text-white">{c.capital}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}