import { Redis } from "ioredis";
import serverConfig from "./serverConfig";

// Import REDIS_PORT and REDIS_HOST directly from serverConfig
const { REDIS_PORT, REDIS_HOST } = serverConfig;

// Create options object for Redis connection
const redisOptions = {
  port: REDIS_PORT,
  host: REDIS_HOST,
  maxRetriesPerRequest:null
};

// Create a new Redis connection instance
const redisConnection = new Redis(redisOptions);

export default redisConnection;
