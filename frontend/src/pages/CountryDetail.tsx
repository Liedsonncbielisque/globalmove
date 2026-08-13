import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, DollarSign, Globe, Briefcase } from 'lucide-react';
import axios from 'axios';
import { FALLBACK_COUNTRIES } from '@/lib/fallback-data';

export default function CountryDetail() {
  const { countryId } = useParams();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const { data } = await axios.get(`/api/countries/${countryId}`, { timeout: 5000 });
        setCountry(data.data.country);
      } catch (err) {
        // Fallback para dados locais
        const local = FALLBACK_COUNTRIES.find(
          (c) => c.iso_code.toLowerCase() === countryId?.toLowerCase()
        );
        setCountry(local || null);
      } finally {
        setLoading(false);
      }
    }
    fetchCountry();
  }, [countryId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="glass p-12 rounded-xl animate-pulse">
            <div className="h-10 bg-surface-secondary rounded mb-4 w-1/3" />
            <div className="h-4 bg-surface-secondary rounded mb-2" />
            <div className="h-4 bg-surface-secondary rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass p-12 rounded-xl">
            <p className="text-error text-lg mb-4">⚠️ País não encontrado</p>
            <Link to="/destinos" className="text-accent hover:underline">
              ← Voltar para destinos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cost = country.costOfLiving || country.cost_of_living?.[0];
  const visas = country.visas || country.visa_routes || [];
  const cities = country.cities || [];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Link to="/destinos" className="inline-flex items-center text-gray-400 hover:text-accent mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para destinos
        </Link>

        {/* Header */}
        <div className="glass p-8 rounded-xl mb-8">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{country.name}</h1>
              <p className="text-gray-400">{country.official_name || country.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm">{country.capital}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-sm">{(country.population / 1000000).toFixed(1)}M hab.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <DollarSign className="h-4 w-4 text-accent" />
              <span className="text-sm">{country.currency}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="h-4 w-4 text-accent" />
              <span className="text-sm">{country.language}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custo de Vida */}
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">💰 Custo de Vida (mensal)</h2>
            {cost ? (
              <div className="space-y-3">
                {[
                  { label: 'Aluguel', value: cost.rent },
                  { label: 'Alimentação', value: cost.food },
                  { label: 'Transporte', value: cost.transport },
                  { label: 'Utilidades', value: cost.utilities },
                  { label: 'Internet', value: cost.internet },
                  { label: 'Saúde', value: cost.health },
                  { label: 'Lazer', value: cost.leisure },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">
                      {Number(item.value).toLocaleString('pt-BR')} {cost.currency}
                    </span>
                  </div>
                ))}
                <div className="border-t border-surface-secondary pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total estimado</span>
                  <span className="text-accent font-bold">
                    {(
                      Number(cost.rent) + Number(cost.food) + Number(cost.transport) +
                      Number(cost.utilities) + Number(cost.internet) + Number(cost.health) +
                      Number(cost.leisure)
                    ).toLocaleString('pt-BR')}{' '}
                    {cost.currency}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Valores estimados · Podem variar por cidade e estilo de vida
                </p>
              </div>
            ) : (
              <p className="text-gray-400">Dados de custo indisponíveis no momento.</p>
            )}
          </div>

          {/* Vistos */}
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">🛂 Rotas Migratórias</h2>
            {visas.length > 0 ? (
              <div className="space-y-4">
                {visas.map((visa: any, i: number) => (
                  <div key={i} className="bg-surface-secondary p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-accent" />
                      <h3 className="text-white font-medium">{visa.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(visa.processingTime || visa.processing_time) && (
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded">
                          ⏱️ {visa.processingTime || visa.processing_time}
                        </span>
                      )}
                      {visa.renewable && (
                        <span className="px-2 py-1 bg-success/10 text-success rounded">✅ Renovável</span>
                      )}
                      {(visa.allowsPR || visa.allows_permanent_residence) && (
                        <span className="px-2 py-1 bg-accent-secondary/10 text-accent-secondary rounded">🏠 Permite RP</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Nenhuma rota cadastrada no momento.</p>
            )}
            <p className="text-xs text-gray-500 mt-4">
              ⚠️ Nenhuma rota garante aprovação. Consulte sempre a fonte oficial do país.
            </p>
          </div>
        </div>

        {/* Cidades */}
        {cities.length > 0 && (
          <div className="glass p-6 rounded-lg mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">🏙️ Principais Cidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map((city: any, i: number) => (
                <div key={i} className="bg-surface-secondary p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">{city.name}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p>População: {(city.population / 1000000).toFixed(1)}M</p>
                    {(city.safetyScore || city.safety_score) && (
                      <p>Segurança: {city.safetyScore || city.safety_score}/100</p>
                    )}
                    {(city.qualityScore || city.quality_of_life_score) && (
                      <p>Qualidade de vida: {city.qualityScore || city.quality_of_life_score}/100</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}