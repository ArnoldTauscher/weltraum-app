import { Main, SideBar, Footer, LoadingSpinner, ErrorMessage } from "./components";
import { useNASAData, useTranslation, useModal, useDelayedContent } from "./hooks";

function App() {
  const { data, isLoading, error, needsTranslation, setNeedsTranslation } = useNASAData();
  const { translatedData, germanText, toggleLanguage } = useTranslation(data, needsTranslation);
  const { showModal, handleToggleModal } = useModal();
  const showContent = useDelayedContent(isLoading);

  // Render-Logik
  if (isLoading || !showContent) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const displayData = germanText ? translatedData : data;

  // Funktion zum Umschalten der Sprache
  const handleTranslate = () => {
    toggleLanguage();
    setNeedsTranslation(false); // setNeedsTranslation wurde aus useNASAData.js exportiert, damit es in App.jsx verwendet werden kann.
  };

  return (
    <>
      <div className="main-content">
        <Main data={data} />
        <Footer data={displayData} handleToggleModal={handleToggleModal} />
      </div>
      {showModal && (
        <SideBar 
          data={displayData} 
          handleToggleModal={handleToggleModal} 
          onTranslate={handleTranslate}
          germanText={germanText}
        />
      )}
    </>
  );
}

export default App;

