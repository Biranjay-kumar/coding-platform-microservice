import express from 'express'
import serverConfig from './config/serverConfig'
import apiRouter from "./routes"

import bodyParser from 'express'

import bullMqConfig from "./config/bullMqConfig";
import runPython from './containers/PythonExecutor'
import runJava from './containers/JavaExecutor'
import runCpp from './containers/CppExecutor'
import submissionWorker from './workers/submissionWorker'
import { submission_queue } from './utils/constants'
import submissionQueueProducer from './producer/submissionQueueProducer'
import SampleWorker from './workers/sampleWorker'
import SubmissionWorker from './workers/submissionWorker'

const app=express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api",apiRouter)
app.use('/ui', bullMqConfig.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);
  

  SubmissionWorker(submission_queue);




})