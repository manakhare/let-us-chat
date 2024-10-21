// import { Redis } from "ioredis";


// const redis = new Redis(`rediss://default:${process.env.REDIS_KEY}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`)

// const redis = new Redis({
//     host: "localhost",
//     port: 6379
// })

// export default redis

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_KEY!
});

export default redis;


