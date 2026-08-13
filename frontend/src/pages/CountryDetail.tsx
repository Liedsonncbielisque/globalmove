import { useParams } from 'react-router-dom';

export default function CountryDetail() {
  const { countryId } = useParams();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">País: {countryId}</h1>
        <div className="glass p-8 rounded-lg">
          <p className="text-gray-300">Detalhes do país em desenvolvimento...</p>
        </div>
      </div>
    </div>
  );
}