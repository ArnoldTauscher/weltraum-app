import PropTypes from "prop-types";

export const ErrorMessage = ({ message }) => (
  <div className="errorState">
    <p>Error: {message}</p>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
