import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const Footer = ({ handleToggleModal, data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer>
      <div className='bgGradient'></div>
      <div>
        <h2>{data?.title}</h2>
        <h1>APOD PROJEKT</h1>
      </div>
      <button onClick={handleToggleModal} aria-label="Info ein-/ausblenden">
        <i className={`fa-solid fa-circle-info ${animate ? 'animate-info' : ''}`}></i>
      </button>
    </footer>
  );
};

Footer.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string
  })
};

