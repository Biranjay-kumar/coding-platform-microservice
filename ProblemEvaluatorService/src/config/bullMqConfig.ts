const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');


import evaluationQueue from "../queue/evaluationQueue";
import sampleQueue from "../queue/sampleQueue";
import submissionQueue from "../queue/submissionQueue";


const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
    queues: [new BullMQAdapter(sampleQueue),new BullMQAdapter(submissionQueue),new BullMQAdapter(evaluationQueue)],
    serverAdapter,
});

export default serverAdapter;