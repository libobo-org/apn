import pg from 'pg';
import * as dotenv from 'dotenv';
import fs from 'fs';

if (!fs.existsSync('../.env')) {
  throw new Error('.env file does not exist');
}

dotenv.config({
  path: '../.env',
});

const { Client, Pool } = pg;

const params = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

export async function makeClient() {
  const client = new Client(params);
  await client.connect();
  return client;
}

export async function makePool() {
  return new Pool(params);
}

export default {
  makeClient,
  makePool,
};
