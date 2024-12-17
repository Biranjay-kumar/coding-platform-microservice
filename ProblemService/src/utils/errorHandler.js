const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/BaseError");

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
      data: {}, //because this is an exception
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
    details: err,
    data: {},
  });
}


module.exports =errorHandler;
