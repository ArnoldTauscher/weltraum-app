import PropTypes from 'prop-types';

export const Main = ({ data }) => (
  <>
    {data?.media_type === 'video' ? (
      <div className='videoContainer'>
      <iframe
        src={data.url}
        title={data.title || 'Astronomy Video of the Day'}
        className='bgVideo'
        allowFullScreen
      />
      </div>
    ) : (
      <div className='imgContainer'>
      <img 
        src={data?.hdurl || data?.url} 
        alt={data?.title || 'Astronomy Picture of the Day'} 
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


