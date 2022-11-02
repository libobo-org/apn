import {promises as fs} from 'fs';

export async function loadSql(name) {
  return await fs.readFile(`./src/sql/${name}`, {encoding: 'utf-8'});
}

export default {
  loadSql,
};
