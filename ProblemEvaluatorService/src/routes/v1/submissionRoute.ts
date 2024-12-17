import express from "express";
import { addSubmission } from "../../controllers/submissionController";
import { validate } from "../../validators/createSubmissionValidator";
import { createSubmissionZodSchema } from "../../dtos/createSubmissionDto";
// import v1Router from "./v1"

const submissionRouter=express.Router();

submissionRouter.post("/",
validate(createSubmissionZodSchema),
addSubmission)




export default submissionRouter;