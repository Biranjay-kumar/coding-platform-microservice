const {Worker}=require('bullmq');
const redisConnection = require('../config/redisConfig');


function evaluationWorker(queue){

 new Worker(queue,async job=>{
  console.log(job.data);
  if(job.name=='EvaluationJob'){
   try {
     const response=await axios.post("http://localhost:3000/sendPayload",{
      userId:job.data.userId,
      payload:job.data

     })
     console.log(response);


   } catch (error) {
    console.log(error);

   }
  }
 },{connection:redisConnection})
}


module.exports=evaluationWorker;