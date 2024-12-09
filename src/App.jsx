import { useEffect, useState, useCallback } from "react";
import { Main, SideBar, Footer, LoadingSpinner, ErrorMessage } from "./components";
import { fetchNASAData } from "./lib/fetch";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiData = await fetchNASAData();
        setData(apiData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleToggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="main-content">
        <Main data={data} />
        <Footer data={data} handleToggleModal={handleToggleModal} />
      </div>
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  );
}

export default App;

