import { Job,  Worker } from "bullmq";

import SampleJob from "../jobs/sampleJob";
import redisConnection from "../config/redisConfig";
// import { Redis } from "ioredis";



export default function SampleWorker(queueName: string) {
 
 new Worker(
  queueName,
  async (job: Job) => {
  
   if (job.name === "sampleJob") {
    const sampleJobInstance = new SampleJob(job.data);

    sampleJobInstance.handle(job);

    return true;

   }

  },{connection: redisConnection}


 )
}