import { useState, useEffect, useCallback } from 'react';
import { translateAndStore, loadStoredTranslation } from '../lib/translate';

export function useTranslation(data, needsTranslation) {
  const [translatedData, setTranslatedData] = useState(null);
  const [germanText, setGermanText] = useState(false);

  // Effekt zum Laden der gespeicherten Übersetzung
  useEffect(() => {
    const storedTranslation = loadStoredTranslation();
    if (storedTranslation) {
      setTranslatedData(storedTranslation);
      setGermanText(true);
    } else if (data && !needsTranslation) {
      setTranslatedData({
        explanation: data.translatedExplanation,
        title: data.translatedTitle
      });
      setGermanText(true);
    }
  }, [data, needsTranslation]);

  // Funktion zum Übersetzen und Speichern der Daten
  const handleTranslateAndStore = useCallback(async () => {
    if (!data?.explanation || !data?.title || !needsTranslation) return;
  
    try {
      const newTranslatedData = await translateAndStore(data);
      setTranslatedData({
        explanation: newTranslatedData.translatedExplanation,
        title: newTranslatedData.translatedTitle
      });
      setGermanText(true);
    } catch (error) {
      console.error('Übersetzungsfehler:', error);
    }
  }, [data, needsTranslation]);

  // Funktion zum Umschalten der Sprache
  const toggleLanguage = useCallback(() => {
    if (germanText) {
      setGermanText(false);
    } else {
      if (translatedData) {
        setGermanText(true);
      } else {
        handleTranslateAndStore();
      }
    }
  }, [germanText, translatedData, handleTranslateAndStore]);

  return { translatedData, germanText, toggleLanguage };
}
