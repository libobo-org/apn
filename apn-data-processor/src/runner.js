import {promises as fs} from 'fs';
import {createRequire} from 'module';
import {
  fetchMeta,
  analyze,
} from './index.js';

const require = createRequire(import.meta.url);
const exists = async path => !!(await fs.stat(path).catch(e => false));

if (!(await exists('out'))) {
  await fs.mkdir('out');
}

const runner = {
  async fetchMeta() {
    const data = await fetchMeta();
    await fs.writeFile('./out/meta.json', JSON.stringify(data));
  },
  async analyze() {
    const data = await analyze();
    await fs.writeFile('./out/analyze.json', JSON.stringify(data));
  },
};

runner[process.argv[2]]();
