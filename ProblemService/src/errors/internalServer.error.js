const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");


class InternalServerError extends BaseError{

 constructor(details){
  super('InternalServerError',StatusCodes.INTERNAL_SERVER_ERROR,`Something went wrong!!`,details);
 }
}


module.exports = InternalServerError;