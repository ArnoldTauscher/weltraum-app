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
    const response = await fetch(`${NASA_API_URL}?api_key=${NASA_API_KEY}`);
    if (!response.ok) {
      throw new Error('NASA API Anfrage fehlgeschlagen');
    }
    const data = await response.json();

    // Daten im lokalen Speicher cachen
    localStorage.setItem(localKey, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der NASA-Daten:', error);
    throw error;
  }
};

