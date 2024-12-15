import PropTypes from 'prop-types';

export const Main = ({ data }) => (
  <>
    {data?.media_type === 'video' ? (
      <div className='videoContainer'>
      <iframe
        src={data.url}
        title={data.title || 'Astronomisches Video des Tages'}
        className='bgVideo'
        allowFullScreen
      />
      </div>
    ) : (
      <div className='imgContainer'>
      <img 
        src={data?.hdurl || data?.url} 
        alt={data?.title || 'Astronomisches Bild des Tages'} 
        className='bgImage'
      />
      </div>
    )}
  </>
);

Main.propTypes = {
  data: PropTypes.shape({
    hdurl: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    media_type: PropTypes.string
  })
};