import PropTypes from "prop-types";

export const ErrorMessage = ({ message }) => (
  <div className="errorState">
    <p>Fehler: {message}</p>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
