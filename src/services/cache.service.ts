import { createClient } from 'redis';

export const client = createClient({
    legacyMode: true,
    socket: {
        port: 6379,
        host: 'localhost'
    }
});

client.on('error', (err) => console.log('Could not establish a connection with redis', err));
client.on('connect', () => console.log('Connected to redis successfully'));
const hups = ( async () => {
    await client.connect();
});

hups();

export default client;