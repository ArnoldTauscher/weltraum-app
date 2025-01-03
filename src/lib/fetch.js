import axios from 'axios';

import { cacheData, getCachedData } from './cache';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_API_URL = import.meta.env.VITE_NASA_API_URL;

const nasaApi = axios.create({
  baseURL: NASA_API_URL,
  params: { api_key: NASA_API_KEY }
});

export const fetchNASAData = async () => {
  const today = new Date().toDateString();
  const localKey = `NASA-${today}`;

  const cachedData = getCachedData(localKey);
  if (cachedData) return { ...cachedData, needsTranslation: false };

  try {
    const { data } = await nasaApi.get('');
    cacheData(localKey, data);
    return { ...data, needsTranslation: true };
  } catch (error) {
    console.error('Fehler beim Abrufen der NASA-Daten:', error);
    throw new Error('Konnte keine NASA-Daten abrufen. Bitte versuchen Sie es später erneut.');
  }
};



