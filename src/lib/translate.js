import axios from 'axios';

import { cacheData, getCachedData } from './cache';

const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const API_URL = import.meta.env.VITE_GOOGLE_TRANSLATE_API_URL;

const translateApi = axios.create({
  baseURL: API_URL,
  params: { key: API_KEY },
  headers: { 'Content-Type': 'application/json' }
});

export const translateAndStore = async (data) => {
  if (!data?.explanation || !data?.title) return null;

  try {
    const { data: translationData } = await translateApi.post('', {
      q: [data.explanation, data.title],
      target: 'de',
      format: 'text'
    });

    const [translatedExplanation, translatedTitle] = translationData.data.translations.map(t => t.translatedText);
    const newTranslatedData = {
      ...data,
      translatedExplanation,
      translatedTitle,
      needsTranslation: false
    };
    
    const today = new Date().toDateString();
    const localKey = `NASA-${today}`;
    cacheData(localKey, newTranslatedData);

    return newTranslatedData;
  } catch (error) {
    console.error('Übersetzungsfehler:', error);
    throw new Error('Übersetzung fehlgeschlagen. Bitte versuchen Sie es später erneut.');
  }
};

export const loadStoredTranslation = () => getCachedData('translatedData');



