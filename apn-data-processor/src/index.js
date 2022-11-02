import {makeClient} from './db.js';
import {loadSql} from './fs.js';

export async function fetchMeta() {
  try {
    const client = await makeClient();
    let res = await client.query('SELECT $1::text as title', ['Meta data']);
    const title = res.rows[0].title;
    res = await client.query('select count(*) from notes');
    const notesCount = res.rows[0].count;
    const sql = await loadSql('notes-count.sql');
    res = await client.query(sql);
    const notesCount2 = res.rows[0].count;
    await client.end();
    return {
      title,
      notesCount,
      notesCount2,
    };
  } catch (e) {
    console.error('Errored fetchMeta');
    console.error(e);
    return null;
  }
}

export async function analyze() {
  // TODO
  return null;
}

export default {
  fetchMeta,
  analyze,
};
