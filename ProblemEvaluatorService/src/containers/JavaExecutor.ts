// import { TestCases } from "../types/testCase";
import { JAVA_IMAGE } from "../utils/constants";
import CodeExecutorStrategy, { ExecutionResponse } from "./CodeExecutorStrategy";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";



class JavaExecutor implements CodeExecutorStrategy {

 async execute(code: string, inputTestCase: string,outputTestCase:string): Promise<ExecutionResponse> {
   console.log('Initializing new java docker container');
   const rawLogBuffer: Buffer[] = [];

   console.log(code,inputTestCase,outputTestCase);
   
     await pullImage(JAVA_IMAGE);
     const runCommand = `
       echo '${code.replace(/'/g, `'\\"`)}' > Main.java && 
       javac Main.java && 
       echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main
     `;
     console.log({ runCommand });

     const javaDockerContainer = await createContainer(JAVA_IMAGE, [
       '/bin/sh',
       '-c',
       runCommand
     ]);

     console.log("Working till here");

     await javaDockerContainer.start();

     const loggerStream = await javaDockerContainer.logs({
       stdout: true,
       stderr: true,
       timestamps: false,
       follow: true
     });

     loggerStream.on('data', (chunk) => {
       rawLogBuffer.push(chunk);
     });

    try{
     const codeResponse: string = await this.fetchDecodedStream(loggerStream, rawLogBuffer);
     await javaDockerContainer.remove();

     return { output: codeResponse, status: "Completed" };

   } catch (error) {
     console.error('Error during execution', error);
     return { output: error as string, status: "ERROR" };

   } finally {
     await javaDockerContainer.remove();
   }
 }

 async fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]): Promise<string> {
   return new Promise((res, rej) => {
     loggerStream.on('end', () => {
       const completeBuffer = Buffer.concat(rawLogBuffer);
       const decodedStream = decodeDockerStream(completeBuffer);
       console.log(decodedStream);
       console.log(decodedStream.stdout);
       if (decodedStream.stderr) {
         rej(decodedStream.stderr);
       } else {
         res(decodedStream.stdout);
       }
     });

     loggerStream.on('error', (error) => {
       rej(error);
     });
   });
 }
}

export default JavaExecutor;