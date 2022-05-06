import { promisify } from 'util';
import { createClient } from "redis";

const redis = require('redis');

class RedisClient {
    constructor(){
        this.client = redis.createClient()
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.client.on('error', (error) => {
            console.error(`Redis client not connected to the server: ${error}`);
          });
    }

    isAlive = () => {
        return this.client.connected;
    }

    async get(key){
        const value = await this.getAsync(key);
        return value;
    }

    async set(key, value, duration){
        await this.client.set(key, val);
        await this.client.expire(key, duration);
    }

    async del(key){
        await this.client.del(key)
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
