#!/usr/bin/node
/*
contains the class RedisClient
constructor that creates a client to Redis:
any error of the redis client must be displayed in the console
a function isAlive that returns true when the connection to Redis is a success
otherwise, false
an asynchronous function get that takes a string key as argument
and returns the Redis value stored for this key
an asynchronous function set that takes a string key, a value
and a duration in second as arguments to store it in Redis
(with an expiration set by the duration argument)
an asynchronous function del that takes a string key as argument
and remove the value in Redis for this key
*/

const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.log(`Redis connection error: ${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, expiration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, expiration, value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
