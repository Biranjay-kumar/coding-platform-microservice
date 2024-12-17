import { ZodSchema } from "zod";
import { createSubmissionDto } from "../dtos/createSubmissionDto";
import { NextFunction, Request, Response } from "express";



export const validate=(schema:ZodSchema<any>)=>(req:Request,res:Response,next:NextFunction)=>{

 try {
   schema.parse({
    ...req.body
   })

   next();

 } catch (error) {
  console.log(error);
  res.status(400).json({
   success:false,
   message:"Invalide request params recieved",
   data:{},
   error:error
  })
  
 }

}