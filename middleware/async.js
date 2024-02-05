const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // Forward the error to the Express error handling middleware
    next(err);
  });
};

module.exports = asyncHandler;
