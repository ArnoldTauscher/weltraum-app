import PropTypes from "prop-types";
import { useRef } from "react";

export const SideBar = ({
  handleToggleModal,
  data,
  onTranslate,
  isTranslated,
}) => {
  const translateButtonRef = useRef(null);

  const handleTranslateClick = (event) => {
    onTranslate();
    // Fokus nur entfernen, wenn der Klick mit der Maus erfolgte
    if (event.type === "click") {
      translateButtonRef.current.blur();
    }
  };

  return (
    <div className="sidebar">
      <div className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionDate">{data?.date}</p>
          <p>{data?.explanation}</p>
          <button
            ref={translateButtonRef}
            onClick={handleTranslateClick}
            className="translateButton"
            aria-label={
              isTranslated
                ? "Zurück zur englischen Version"
                : "Text ins Deutsche übersetzen"
            }
          >
            {isTranslated ? "Show English" : "Übersetzen"}
          </button>
        </div>
        <button
          onClick={handleToggleModal}
          aria-label="Seitenleiste schließen"
          className="closeButton"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    explanation: PropTypes.string,
  }),
  onTranslate: PropTypes.func.isRequired,
  isTranslated: PropTypes.bool.isRequired,
};