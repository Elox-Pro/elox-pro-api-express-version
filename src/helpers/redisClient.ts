import { createClient, RedisClientType } from 'redis';
import config from "../config";

interface RedisConfig {
    host: string;
    port: number;
    password?: string;
}

const defaultConfig: RedisConfig = {
    host: config.REDIS_HOST,
    port: parseInt(config.REDIS_PORT)
}

/**
 * Redis client instance for interacting with the Redis database.
 */
const client: RedisClientType = createClient(defaultConfig);

/**
 * Initializes the Redis client connection.
 *
 * @returns {Promise<void>} A Promise that resolves when the client is connected.
 */
const init = async () => {
    await client.connect();
};

// Handle potential errors during initialization
init().catch((err) => console.log(err));

// Event handlers for Redis client events

/**
 * Logs a message when the client connects to Redis.
 */
client.on('connect', () => {
    console.log('Client connected to Redis...');
});

/**
 * Logs a message when the client is fully ready for use.
 */
client.on('ready', () => {
    console.log('Client connected to Redis and ready to use');
});

/**
 * Logs error messages from the Redis client.
 *
 * @param {Error} err The error object.
 */
client.on('error', (err) => {
    console.log(err.message);
});

/**
 * Logs a message when the client disconnects from Redis.
 */
client.on('end', () => {
    console.log('Client disconnected from Redis');
});

/**
 * Gracefully closes the Redis client connection when the process receives a SIGINT signal (e.g., Ctrl+C).
 */
process.on('SIGINT', () => {
    client.quit();
});

// Export the Redis client for use in other parts of the application
export default client;
