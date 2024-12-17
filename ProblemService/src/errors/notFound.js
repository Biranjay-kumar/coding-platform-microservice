const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");


class NotFound extends BaseError{

 constructor(resourceName,resourceValue){
  super('NotFound',StatusCodes.NOT_FOUND,`The requested resource :${resourceName} with value ${resourceValue} not found`,{
   resourceName,
   resourceValue
  });
 }
}


module.exports = NotFound;