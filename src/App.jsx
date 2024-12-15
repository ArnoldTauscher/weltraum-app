import { useEffect, useState, useCallback } from "react";
import { Main, SideBar, Footer, LoadingSpinner, ErrorMessage } from "./components";
import { fetchNASAData } from "./lib/fetch";
import { translateAndStore, loadStoredTranslation } from "./lib/translate";

function App() {
  // Zustandsvariablen
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [translatedData, setTranslatedData] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);

  // Funktion zum Laden der NASA-Daten
  const loadNASAData = useCallback(async () => {
    try {
      const apiData = await fetchNASAData();
      setData(apiData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Funktion zum Übersetzen und Speichern der Daten
  const handleTranslateAndStore = useCallback(async () => {
    if (!data?.explanation || !data?.title) return;
  
    try {
      const newTranslatedData = await translateAndStore(data);
      setTranslatedData(newTranslatedData);
      setIsTranslated(true);
    } catch (error) {
      console.error('Übersetzungsfehler:', error);
    }
  }, [data]);

  // Funktion zum Umschalten der Sprache
  const toggleLanguage = useCallback(() => {
    if (isTranslated) {
      setIsTranslated(false);
    } else {
      if (translatedData) {
        setIsTranslated(true);
      } else {
        handleTranslateAndStore();
      }
    }
  }, [isTranslated, translatedData, handleTranslateAndStore]);

  // Funktion zum Umschalten des Modals
  const handleToggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  // Effekt zum Laden der NASA-Daten beim Komponenten-Mount
  useEffect(() => {
    loadNASAData();
  }, [loadNASAData]);

  // Effekt zum Anzeigen des Inhalts nach einer Verzögerung
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Effekt zum Laden der gespeicherten Übersetzung
  useEffect(() => {
    const storedTranslation = loadStoredTranslation();
    if (storedTranslation) {
      setTranslatedData(storedTranslation);
    }
  }, []);

  // Render-Logik
  if (isLoading || !showContent) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <div className="main-content">
        <Main data={data} />
        <Footer data={data} handleToggleModal={handleToggleModal} />
      </div>
      {showModal && (
        <SideBar 
          data={isTranslated ? translatedData : data} 
          handleToggleModal={handleToggleModal} 
          onTranslate={toggleLanguage}
          isTranslated={isTranslated}
        />
      )}
    </>
  );
}

export default App;