import { Request, Response } from "express";
import { createSubmissionDto } from "../dtos/createSubmissionDto";




export function addSubmission(req:Request, res:Response){


 const submissionDto=req.body as 
createSubmissionDto
 return res.status(201).json({
  success:true,
  error:{},
  message:"Successfull collected the submission",
  data:submissionDto
 })
}