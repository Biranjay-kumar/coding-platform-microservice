const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");


class NotImplemented extends BaseError{

 constructor(methodname){
  super('NotImplemented',StatusCodes.NOT_IMPLEMENTED,`${methodname} Not Implemented `,details);
 }
}


module.exports = NotImplemented;