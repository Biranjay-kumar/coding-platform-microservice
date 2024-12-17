const { markdownSanitizer } = require("../utils");


class ProblemService{
 constructor(problemRepository){
  this.problemRepository = problemRepository;
 }

 async createProblem(problemData){

 try {
  problemData.description=markdownSanitizer(problemData.description);
 
  const problem= await this.problemRepository.createProblem(problemData);


  return problem;
  
 } catch (error) {

  console.log(error);
  throw error;
 }

}

async getAllProblems(){
 const problems=await this.problemRepository.getAllProblems();
 return problems;
}

async getProblem(problemId){
 const problem= this.problemRepository.getProblem(problemId);
 return problem;
}

async deleteProblem(problemId){
 const problem= await this.problemRepository.deleteProblem(problemId); 
 return problem;
}

async updateProblem(problemId,updatedData){
 const problem= this.problemRepository.updateProblem(problemId,updatedData);
 return problem;
}

}

module.exports =ProblemService;