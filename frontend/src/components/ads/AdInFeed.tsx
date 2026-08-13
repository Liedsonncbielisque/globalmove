import { useEffect } from 'react';

interface AdInFeedProps {
  slot: string;
  className?: string;
}

export function AdInFeed({ slot, className = '' }: AdInFeedProps) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  return (
    <div className={`ad-infeed ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-6t+ed+2i-1n-4w"
        data-ad-client={clientId}
        data-ad-slot={slot}
      />
    </div>
  );
}