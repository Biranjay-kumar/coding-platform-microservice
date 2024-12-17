// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utils/constants';
import CodeExecutorStrategy, { ExecutionResponse } from './CodeExecutorStrategy';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';
// import pullImage from './pullImage';


// Implement the CppExecutor class
class CppExecutor implements CodeExecutorStrategy {

    async execute(code: string, inputTestCase: string,outputTestCase:string): Promise<ExecutionResponse> {
        console.log("Initializing a new cpp docker container");
        const rawLogBuffer: Buffer[] = [];


        console.log(code,inputTestCase,outputTestCase);

        await pullImage(CPP_IMAGE);
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
        console.log(runCommand);
        const cppDockerContainer = await createContainer(CPP_IMAGE, [
            '/bin/sh',
            '-c',
            runCommand
        ]);

        // starting / booting the corresponding docker container
        await cppDockerContainer.start();
        console.log("Started the docker container");

        const loggerStream = await cppDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });

        // Attach events on the stream objects to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {

            const codeResponse: string = await this.fetchDecodedStream(loggerStream, rawLogBuffer);
            // await cppDockerContainer.remove();
            if(codeResponse.trim()===outputTestCase.trim()){
            return { output: codeResponse, status: "Completed" };
            }else{
                return {output:codeResponse,status:"WA"}
            }

        } catch (error) {
            console.error('Error during execution', error);
            if(error==="TLE"){
                await cppDockerContainer.kill();
            }
            return { output: error as string, status: "ERROR" };

        } finally {
            await cppDockerContainer.remove();
        }
    }

    async fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]): Promise<string> {
        return new Promise((res, rej) => {

            const timeout=setTimeout(()=>{

                console.log("Timeout called");
                rej('TLE');
            },2000)
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

export default CppExecutor;