import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";
// import runCpp from "../containers/CppExecutor";
import createFactory from "../utils/ExecutorFactory";
import { ExecutionResponse } from "../containers/CodeExecutorStrategy";
import evaluationQueueProducer from "../producer/evaluationQueueProducer";


export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, SubmissionPayload>;

    constructor(payload: Record<string, SubmissionPayload>) {

        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        console.log(job);
        console.log(this.payload);
        const key = Object.keys(this.payload)[0];
        console.log(this.payload[key].language);

        const codeLanguage = this.payload[key].language
        const code = this.payload[key].code;
        const inputTestCase = this.payload[key].inputCase;
        const outputTestCase=this.payload[key].outputCase;

        const strategy = createFactory(codeLanguage);
        if (strategy !== null) {
            const response: ExecutionResponse = await strategy.execute(code, inputTestCase ,outputTestCase);
            console.log(response)
            evaluationQueueProducer({response,userId:this.payload[key].userId,submissionId:this.payload[key].submissionId})
            if (response.status === 'Completed') {
                console.log("Code executed Successfully");
                console.log(response);
            }
            else {
                console.log("Something went wrong with code execution");
                console.log(response);
            }
        }


    }

    failed = (job?: Job): void => {
        console.log("Job failed");
        if (job) {
            console.log(job.id);
        }
    }

}