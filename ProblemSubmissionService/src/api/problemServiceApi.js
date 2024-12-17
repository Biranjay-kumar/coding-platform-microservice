const { PROBLEM_ADMIN_SERVICE_URL } = require("../config/serverConfig");
const axiosInstance = require("../utils/axiosInstance");

const PROBLEM_ADMIN_API_URL = `${PROBLEM_ADMIN_SERVICE_URL}/ap1/v1`;

//this is going to communicate with other service sync it doesnot matter we have used asyn await here will make it async communication
async function fetchProblemDetails(problemId) {
  try {

    const uri=PROBLEM_ADMIN_API_URL+`/problems/${problemId}`;
    const response = await axiosInstance.get(uri);
    console.log('Api response',response);
    return response;


  } catch (error) {
    console.log("Error while fetching the details of the problem");
    console.log(error);
  }
}


module.exports={
 fetchProblemDetails
}