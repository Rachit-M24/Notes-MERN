import  { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

//Create a rate limiter, that allows 10 requests per 20 seconds
const rateLimitConfig = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
  analytics: true,
});

export default rateLimitConfig;
