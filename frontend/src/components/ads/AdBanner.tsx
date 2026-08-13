import { useState, useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  label?: boolean;
}

export function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  label = true,
}: AdBannerProps) {
  const [adsEnabled, setAdsEnabled] = useState(false);

  useEffect(() => {
    const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
    setAdsEnabled(!!clientId);

    if (clientId && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  // Placeholder elegante quando AdSense não está configurado
  if (!adsEnabled) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-dashed border-surface-secondary bg-surface/30 ${className}`}>
        {label && (
          <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider text-gray-600">
            Publicidade
          </span>
        )}
        <div className="flex items-center justify-center min-h-[120px] p-6">
          <div className="text-center">
            <div className="text-2xl mb-2 opacity-30">📢</div>
            <p className="text-xs text-gray-600">Espaço reservado para anúncio</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container relative ${className}`}>
      {label && (
        <span className="block text-right text-[10px] uppercase tracking-wider text-gray-600 mb-1">
          Publicidade
        </span>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}