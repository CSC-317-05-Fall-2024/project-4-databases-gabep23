import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
};
export const pool = new pg.Pool(config);