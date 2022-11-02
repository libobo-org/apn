import {promises as fs} from 'fs';
import {createRequire} from 'module';
import {
  fetchMeta,
  fetchCustomsData,
  fetchTnvedAll,
  fetchGispProductsAll,
  fetchGispOrganizationsAll,
  fetchOrganizationsInfoFromListorg,
  validateProductsTnveds,
} from './index.js';

const require = createRequire(import.meta.url);
const exists = async path => !!(await fs.stat(path).catch(e => false));

if (!(await exists('out'))) {
  await fs.mkdir('out');
}

const runner = {
  async fetchMeta() {
    const data = await fetchMeta();
    await fs.writeFile('./out/fts-meta.json', JSON.stringify(data));
  },
  async fetchCustomsDataAll() {
    if (!(await exists('out/data'))) {
      await fs.mkdir('out/data');
    }
    let data = await fetchCustomsData();
    console.log(`Pages count: ${data?.pageCount}`)
    await fs.writeFile('./out/data/1.json', JSON.stringify(data));
    console.log('Page 1 saved');
    if (data?.pageCount > 1) {
      for (let i = 2; i <= data.pageCount; i +=1) {
        data = await fetchCustomsData(i);
        await fs.writeFile(`./out/data/${i}.json`, JSON.stringify(data));
        console.log(`Page ${i} saved`);
      }
    }
  },
  async fetchTnvedAll() {
    const tnvedMain = require('./out/fts-meta.json').tnved;
    const data = await fetchTnvedAll(tnvedMain);
    await fs.writeFile('./out/tnved.json', JSON.stringify(data));
  },
  async fetchGispProductsAll() {
    const data = await fetchGispProductsAll();
    await fs.writeFile('./out/gisp-products.json', JSON.stringify(data));
  },
  async fetchGispOrganizationsAll() {
    const data = await fetchGispOrganizationsAll();
    await fs.writeFile('./out/gisp-organizations.json', JSON.stringify(data));
  },
  async fetchOrganizationsInfo() {
    const organizations = require('./out/gisp-organizations.json').map(el => el.org_ogrn);
    let organizationsInfo = null;
    try {
      organizationsInfo = require('./out/gisp-organizations-info.json');
    } catch {}
    let processedOrganizations = [];
    let needProcessOrganizations = organizations;
    if (organizationsInfo) {
      processedOrganizations = Object.keys(organizationsInfo);
      needProcessOrganizations = organizations.filter(el => !processedOrganizations.includes('' + el));
      if (!needProcessOrganizations.length) {
        console.log('All organizations have been processed already');
        return;
      }
      console.log(`Processed items: ${processedOrganizations.length}`);
    }
    console.log(`Need process items: ${needProcessOrganizations.length}`);
    const data = await fetchOrganizationsInfoFromListorg(needProcessOrganizations);
    if (organizationsInfo) {
      await fs.writeFile('./out/gisp-organizations-info.json', JSON.stringify({
        ...organizationsInfo,
        ...data,
      }));
    } else {
      await fs.writeFile('./out/gisp-organizations-info.json', JSON.stringify(data));
    }
  },
  async mergeShit() {
    const d1 = require('./out/gisp-organizations-info copy 3.json');
    const d2 = require('./out/gisp-organizations-info copy.json');
    const d3 = require('./out/gisp-organizations-info copy 2.json');
    const k1 = Object.keys(d1);
    const k2 = Object.keys(d2);
    const k3 = Object.keys(d3);
    k2.forEach(k => {
      if (!k1.includes(k)) {
        d1[k] = d2[k];
      }
    });
    k3.forEach(k => {
      if (!k1.includes(k)) {
        d1[k] = d3[k];
      }
    });
    await fs.writeFile('./out/gisp-organizations-info-cool.json', JSON.stringify(d1));
  },
  async validateProductsTnveds() {
    const products = require('./out/gisp-products.json');
    const tnveds = require('./out/tnved.json').res.map(el => el.id);
    const tnvedsAll = products.map(el => el.product_tnved);
    await fs.writeFile('./out/tnveds-all.json', JSON.stringify(tnvedsAll, null, 2));
    const tnvedsFixed = await validateProductsTnveds(products, tnveds);

    tnvedsFixed.forEach(el => {
      if (!el?.product_tnved?.length) {
        return;
      }
      const a = el.product_tnved.filter(s => !tnveds.includes(s));
      if (a.length > 0) {
        let isBad = false;
        let is6 = false;
        let is4 = false;
        a.forEach(a1 => {
          if (!tnveds.includes(a1.slice(0, 8))) {
            if (!tnveds.includes(a1.slice(0, 6))) {
              if (!tnveds.includes(a1.slice(0, 4))) {
                isBad = true;
              } else {
                is4 = true;
              }
            } else {
              is6 = true
            }
          }
        });
        if (!isBad) {
          el.product_tnved = el.product_tnved.map(s => {
            if (!tnveds.includes(s)) {
              if (is4) {
                return s.slice(0, 4);
              } else {
                if (is6) {
                  return s.slice(0, 6);
                } else {
                  return s.slice(0, 8);
                }
              }
            }
            return s;
          });
        }
      }
    });

    tnvedsFixed.forEach(el => {
      if (!el?.product_tnved?.length) {
        return;
      }
      const a = el.product_tnved.filter(s => !tnveds.includes(s));
      if (a.length > 0) {
      // if (a.length > 1) {
        console.log(el.product_tnved.join(';'), el.product_tnved_orig, el.product_name)
        console.log('BADBADBAD:', a.join(';'));
        a.forEach(a1 => {
          if (tnveds.includes(a1.slice(0, 8))) {
            console.log('OK:', a1.slice(0, 8))
          }
          if (tnveds.includes(a1.slice(0, 6))) {
            console.log('OK:', a1.slice(0, 6))
          }
        })
      }
    });

    await fs.writeFile('./out/gisp-products-fixed.json', JSON.stringify(tnvedsFixed, null, 2));
    // await fs.writeFile('./out/tnveds-fixed.json', JSON.stringify(tnvedsFixed));

    // return;
    //
    // const tnvedsFixedCodes = tnvedsFixed.map(el => el.product_tnved);
    //
    //
    // const tnvedsFixedCodesWtf = tnvedsFixedCodes.forEach(el => {
    //   if (!el) {
    //     return;
    //   }
    //   const a = el.filter(el => !tnveds.includes(el));
    //   // if (a.length > 0) {
    //   if (a.length > 1) {
    //     console.log(el.join(';'))
    //   }
    // })

    // console.log(tnvedsFixedCodesWtf.join('\n'))

    // await fs.writeFile('./out/tnveds-fixed.json', JSON.stringify(tnvedsFixed, null, 2));
    // const d2 = d.filter(s => s && !s.includes(';') && s.length > 10).map(s => `"${s}"`);
    // await fs.writeFile('./out/tnveds-wtf1.txt', d2.join('\n'));
  },
};

runner[process.argv[2]]();
