import pg from 'pg';

const { Client, Pool } = pg;

const params = {
  user: 'postgres',
  host: '45.9.26.8',
  database: 'apn-db',
  password: 'VLGdlklS#92Sq9!M^PE3%*WY91c^L5GO',
  port: 5439,
}

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
