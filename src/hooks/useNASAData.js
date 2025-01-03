import { useState, useEffect, useCallback } from 'react';
import { fetchNASAData } from '../lib/fetch';

// Funktion zum Laden der NASA-Daten
export function useNASAData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsTranslation, setNeedsTranslation] = useState(true);

  const loadNASAData = useCallback(async () => {
    try {
      const apiData = await fetchNASAData();
      setData(apiData);
      setNeedsTranslation(apiData.needsTranslation);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNASAData();
  }, [loadNASAData]);

  return { data, isLoading, error, needsTranslation, setNeedsTranslation };
}

