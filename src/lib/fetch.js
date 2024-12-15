import axios from 'axios';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_API_URL = import.meta.env.VITE_NASA_API_URL;

export const fetchNASAData = async () => {
  const today = new Date().toDateString();
  const localKey = `NASA-${today}`;

  // Überprüfen, ob Daten im lokalen Speicher vorhanden sind
  const cachedData = localStorage.getItem(localKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Wenn keine Daten im Cache, von der API abrufen
  try {
    const response = await axios.get(NASA_API_URL, {
      params: { api_key: NASA_API_KEY }
    });
    const data = response.data;

    // Daten im lokalen Speicher cachen
    localStorage.setItem(localKey, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der NASA-Daten:', error);
    throw error;
  }
};

