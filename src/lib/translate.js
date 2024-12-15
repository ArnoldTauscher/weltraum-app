import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const API_URL = import.meta.env.VITE_GOOGLE_TRANSLATE_API_URL;

export const translateAndStore = async (data) => {
  if (!data?.explanation || !data?.title) return null;

  try {
    // API-Anfrage zur Übersetzung
    const response = await axios.post(API_URL, {
      q: [data.explanation, data.title],
      target: 'de',
      format: 'text'
    }, {
      params: { key: API_KEY },
      headers: { 'Content-Type': 'application/json' }
    });

    // Extrahieren der übersetzten Texte
    const [translatedExplanation, translatedTitle] = response.data.data.translations.map(t => t.translatedText);
    const newTranslatedData = { explanation: translatedExplanation, title: translatedTitle };
    
    // Speichern der übersetzten Daten im lokalen Speicher
    localStorage.setItem('translatedData', JSON.stringify(newTranslatedData));
    return newTranslatedData;
  } catch (error) {
    console.error('Übersetzungsfehler:', error);
    return null;
  }
};

export const loadStoredTranslation = () => {
  const storedTranslation = localStorage.getItem('translatedData');
  return storedTranslation ? JSON.parse(storedTranslation) : null;
};


