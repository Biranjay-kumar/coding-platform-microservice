const logger = require("../config/logger.config");
const NotFound = require("../errors/notFound");
const { Problem } = require("../models")

class ProblemRepository{

 async createProblem(problemData){
  try {
    
    const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: (problemData.testCases) ? problemData.testCases : []
    });

    return problem;
} catch(error) {
    // console.log(error.message);
    throw error;
}
 }

 async getAllProblems(){
  try {
   const problems=await Problem.find({});

  return problems;
   
  } catch (error) {
  //  console.log(error);
    throw error;
  }
 }

 async getProblem(problemId){
  try {
    const problem=await Problem.findById(problemId);
  if(!problem){
   throw new NotFound('Problem',problemId)
  }
  return problem;
    
  } catch (error) {
    // console.log(error);
    throw error;
    
  }
 }


 async deleteProblem(problemId){
  try {
    const deletedProblem=await Problem.findByIdAndDelete(problemId);
    if(!deletedProblem){
      logger.error(`Problem with id ${problemId} is not found in the database`);
      throw new NotFound("problem",problemId);
    }
    
    return deletedProblem;
  } catch (error) {
    console.log(error.message);
    throw error;
    
    
  }
 }

 async updateProblem(problemId,updatedData){
  try {
    const updatedProblem=await Problem.findByIdAndUpdate(problemId,updatedData,{new:true});
    if(!updatedProblem){
      throw new NotFound("problem",problemId);
    }
    return updatedProblem;
    
  } catch (error) {
    console.log(error);
    throw error;
    
  }
 }

}



module.exports =ProblemRepository;

