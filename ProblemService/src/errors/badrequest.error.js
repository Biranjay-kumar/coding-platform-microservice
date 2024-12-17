const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");


class BadRequest extends BaseError{

 constructor(propertyName,details){
  super('BadRequest',StatusCodes.Bad_Request,`Invalid structure for ${propertyName} provided`,details);
 }
}


module.exports = BadRequest;