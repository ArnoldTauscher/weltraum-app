import PropTypes from 'prop-types';

export const SideBar = ({ handleToggleModal, data }) => (
  <div className='sidebar'>
    <div className='bgOverlay'></div>
    <div className='sidebarContents'>
      <h2>{data?.title}</h2>
      <div className='descriptionContainer'>
        <p className='descriptionDate'>{data?.date}</p>
        <p>{data?.explanation}</p>
      </div>
      <button onClick={handleToggleModal} aria-label="Close sidebar">
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
);

SideBar.propTypes = {
  handleToggleModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    explanation: PropTypes.string
  })
};
  
