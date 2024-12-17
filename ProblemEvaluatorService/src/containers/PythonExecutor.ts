// import { TestCases } from "../types/testCase";
import { PYTHON_IMAGE } from "../utils/constants";
import CodeExecutorStrategy, { ExecutionResponse } from "./CodeExecutorStrategy";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";



class PythonExecutor implements CodeExecutorStrategy {

  async execute(code: string, inputTestCase: string,outputTestCase:string): Promise<ExecutionResponse> {
    console.log('Initializing new python docker container');
    const rawLogBuffer: Buffer[] = [];
    console.log(outputTestCase);
 
      await pullImage(PYTHON_IMAGE);

      const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
      console.log({ runCommand });

      const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
        '/bin/sh',
        '-c',
        runCommand
      ]);

      console.log("working till here");

      await pythonDockerContainer.start();

      const loggerStream = await pythonDockerContainer.logs({
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
      await pythonDockerContainer.remove();

      return { output: codeResponse, status: "Completed" };

    } catch (error) {
      console.error('Error during execution', error);
      return { output: error as string, status: "ERROR" };

    } finally {
      await pythonDockerContainer.remove();
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

export default PythonExecutor;
