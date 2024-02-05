/**
 *
 * @param {Object} err
 * @returns {String}
 */
export const handleError = (err) => {
  if (err.response) {
    if (err.response.data.error) {
      return err.response.data.error;
    } else {
      return ' you have same error code ' + err.response;
    }
  } else {
    return err.message;
  }
};
