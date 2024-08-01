const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;  
    const errorResponse = {
      error: {
        message: err.message || 'An unexpected error occurred',
        status: statusCode
      }
    };
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;