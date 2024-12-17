const {  fetchProblemDetails } = require('../api/ProblemServiceApi');
const SubmissionCreationError = require('../errors/submissionCreationError');
const SubmissionProducer = require('../producers/submissionQueueProducer');
class SubmissionService {
    constructor(submissionRepository) {
        // inject here
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submissionPayload) {

        const problemId=submissionPayload.problemId;
        const userId=submissionPayload.userId

        const problemApiAdminResponse=await fetchProblemDetails(problemId);
        if(!problemApiAdminResponse){
            throw new SubmissionCreationError('Failed to create a submission in the repository');
        }
        // console.log(problemApiAdminResponse)

        const languageCodeStub=problemApiAdminResponse.data.codeStubs.find((codeStubs)=>{
            codeStubs.language.toLowercase()===submissionPayload.language.toLowercase()
        })

        // console.log(languageCodeStub);
         submissionPayload.code=languageCodeStub.startSnippet + '/n/n' + submissionPayload.userSnippet +'/n/n' +submissionPayload.endSnippet;


        //creating entry in the db

        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission) {
           
            throw new SubmissionCreationError('Failed to create a submission in the repository');
        }
        console.log(submission);


        const response = await SubmissionProducer({
            [submission._id]:{
                code:submission.code,
            language:submission.language,
            inputCase:problemApiAdminResponse.data.testCases[0].input,
            outputCase:problemApiAdminResponse.data.testCases[0].output,
                userId,
                submissionId:submission._id
            }

        });
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService