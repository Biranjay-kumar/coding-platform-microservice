const { StatusCodes } = require("http-status-codes");
const { ProblemRepository } = require("../repositories");
const { ProblemService } = require("../services");

const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res) {
  return res.json({
    message: "Problem controller is up",
  });
}

async function addProblem(req, res,next) {
  try {
    console.log(req.body);
    const newProblem =await problemService.createProblem(req.body);
    // console.log("newProblem",newProblem);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new problem",
      err: {},
      data: newProblem,
    });
  } catch (error) {
    next(error);
  }
}


async function getProblem(req, res,next) {
 try {
  
  const problemId=req.params.id;
 const problem = await problemService.getProblem(problemId);
 return res.status(StatusCodes.OK).json({
  success: true,
  message: "Successfully fetched the required problem",
  err: {},
  data: problem,
  


 })
 } catch (error) {
  next(error);
  
 }

}


//for fetching all the prorblems 
async function getProblems(req, res,next) {
  try {
    const problems = await problemService.getAllProblems();

    return res.json({
      success: true,
      message: "Successfully fetched the  problems",
      err: {},
      data: problems,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProblem(req, res,next) {

  try {
    const deletedProblem = await problemService.deleteProblem(req.params.id);
  return res.status(StatusCodes.OK).json({
    success:true,
    message: "Successfully deleted the problem",
    err:{},
    data: deletedProblem
  })
  } catch (error) {
    next(error);
    
  }

}

async function updateProblem(req, res,next) {
  try {
    const updatedProblem = await problemService.updateProblem(req.params.id,req.body);
    return res.status(StatusCodes.OK).json({
      success:true,
      message: "Successfully updated the problem",
      err:{},
      data: updatedProblem
    })
    
  } catch (error) {
    next(error);
    
  }
}

module.exports = {
  addProblem,
  getProblem,
  getProblems,
  deleteProblem,
  updateProblem,
  pingProblemController,
};
