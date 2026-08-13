import { useEffect } from 'react';

interface AdInArticleProps {
  slot: string;
  className?: string;
}

export function AdInArticle({ slot, className = '' }: AdInArticleProps) {
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
    <div className={`ad-inarticle my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={clientId}
        data-ad-slot={slot}
      />
    </div>
  );
}