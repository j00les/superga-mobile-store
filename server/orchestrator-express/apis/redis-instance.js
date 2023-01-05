const { default: Redis } = require("ioredis");

//enwV11rITpojkaLTACnO8RE5tVukkoCH
//
const redis = new Redis({
  username: "default",
  password: process.env.REDIS_PASS,
  host: "redis-13747.c8.us-east-1-4.ec2.cloud.redislabs.com",
  port: "13747",
});
module.exports = redis;
