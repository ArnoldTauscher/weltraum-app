import { useState, useEffect } from 'react';

export function useDelayedContent(isLoading) {
  const [showContent, setShowContent] = useState(false);

  // Effekt zum Anzeigen des Inhalts nach einer Verzögerung
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return showContent;
}