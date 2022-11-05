import jsdom from 'jsdom';

export function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', `${exportName}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function downloadJsonMeta() {
  const data = JSON.parse(document.getElementById('__NEXT_DATA__').textContent).props.initialState;

  const usefulData = {
    federalDistricts: data.federalDistricts.items,
    directions: data.directions.items,
    yearsList: data.years.yearsList,
    countries: data.countries.items,
    costForms: data.costForms.items,
    okp: data.okp.items,
    periods: data.periods.items,
    tnved: data.tnved.items,
    tnvedLevels: data.tnvedLevels.items,
    weightForms: data.weightForms.items,
  };

  downloadObjectAsJson(usefulData, 'fts-meta');
}

export async function fetchMeta() {
  const response = await fetch('http://stat.customs.ru/analysis');
  const html = await response.text();
  const json = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)?.[1];
  const data = JSON.parse(json).props.initialState;
  return {
    federalDistricts: data.federalDistricts.items,
    directions: data.directions.items,
    yearsList: data.years.yearsList,
    countries: data.countries.items,
    costForms: data.costForms.items,
    okp: data.okp.items,
    periods: data.periods.items,
    tnved: data.tnved.items,
    tnvedLevels: data.tnvedLevels.items,
    weightForms: data.weightForms.items,
  };
}

export async function fetchCustomsData(page = 1) {
  const queryParams = {
    page,
    pageSize: 300, // MAX 300
  };

  const payload = {
    // direction: "ИМ",
    periodTab: "YY",
    period: [],
    countries: [],
    tnved: [],
    tnvedLevel: 2,
    federalDistricts: [],
    subjects: [],
    costForm: 1,
    weightForm: 1,
  };

  const response = await fetch(`http://stat.customs.gov.ru/api/DataAnalysis/Search?${new URLSearchParams(queryParams)}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}

export async function fetchTnved(parent) {
  const response = await fetch(`http://stat.customs.gov.ru/api/Tnved/GetCodes?parent=${parent}`);
  return await response.json();
}

export async function fetchTnvedAll(tnvedMain) {
  const res = [
    ...tnvedMain
  ];

  const ids2 = [];
  const ids4 = [];
  const ids6 = [];
  const ids8 = [];
  const ids10 = [];

  for (let tnvedMainItem of tnvedMain) {
    console.log(`id2: ${tnvedMainItem.id}`)
    const data4 = await fetchTnved(tnvedMainItem.id);
    ids2.push(tnvedMainItem.id);

    for (let item4 of data4) {
      res.push(item4);
      console.log(`id4: ${item4.id}`)
      const data6 = await fetchTnved(item4.id);
      ids4.push(item4.id);

      for (let item6 of data6) {
        res.push(item6);
        const data8 = await fetchTnved(item6.id);
        ids6.push(item6.id);

        for (let item8 of data8) {
          res.push(item8);
          const data10 = await fetchTnved(item8.id);
          ids8.push(item8.id);

          for (let item10 of data10) {
            res.push(item10);
            ids10.push(item10.id);
          }
        }
      }
    }
  }

  return {
    ids: {
      ids2,
      ids4,
      ids6,
      ids8,
      ids10,
    },
    data: res,
  };
}

export async function fetchGispProducts(take = 1000, skip = 0) {
  const payload = {
    opt: {
      sort: null,
      requireTotalCount: true,
      searchOperation: "contains",
      searchValue: null,
      skip,
      take,
      userData: {},
    },
  };
  const response = await fetch(`https://gisp.gov.ru/pp719v2/pub/prod/b/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function fetchGispProductsAll() {
  const take = 1000;
  let data = await fetchGispProducts(take, 0);
  let res = [...data.items];
  const count = data.total_count;
  console.log(`Items count: ${count}`);
  console.log(`Items extracted: ${take}`);
  let skip = 0;
  while (skip + take < count) {
    skip += 1000;
    try {
      data = await fetchGispProducts(take, skip);
      await new Promise(r => setTimeout(r,parseInt(Math.random() * 50) * 20));
      res = [...res, ...data.items];
      console.log(`Items extracted: ${skip + take}`);
    } catch (e) {
      console.error(`Items errored: ${skip + take}`);
      console.error(e);
    }
  }
  return res;
}

export async function fetchGispOrganizations(take = 1000, skip = 0) {
  const payload = {
    opt: {
      sort: null,
      requireTotalCount: true,
      searchOperation: "contains",
      searchValue: null,
      skip,
      take,
      userData: {},
    },
  };
  const response = await fetch(`https://gisp.gov.ru/pp719v2/pub/org/b/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

export async function fetchGispOrganizationsAll() {
  const take = 1000;
  let data = await fetchGispOrganizations(take, 0);
  let res = [...data.items];
  const count = data.total_count;
  console.log(`Items count: ${count}`);
  console.log(`Items extracted: ${take}`);
  let skip = 0;
  while (skip + take < count) {
    skip += 1000;
    try {
      data = await fetchGispOrganizations(take, skip);
      await new Promise(r => setTimeout(r,parseInt(Math.random() * 50) * 20));
      res = [...res, ...data.items];
      console.log(`Items extracted: ${skip + take}`);
    } catch (e) {
      console.error(`Items errored: ${skip + take}`);
      console.error(e);
    }
  }
  return res;
}

async function fetchNalogEgrulSearchToken(ogrn) {
  const url = 'https://egrul.nalog.ru/';

  const params = new URLSearchParams({
    vyp3CaptchaToken: '',
    page: '',
    query: ogrn,
    region: '',
    PreventChromeAutocomplete: '',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    const json = await response.json();
    return json.t;
  } catch (e) {
    console.error('Errored', query);
    console.error(e);
    return null;
  }
}

async function fetchOrganizationInfoFromListorg(ogrn = 1022402060878) {
  let r = await fetch(`https://www.list-org.com/autocomplete?query=${ogrn}`);
  let json = await r.json();
  if (!json.suggestions?.length) {
    return {
      ogrn,
    };
  }
  const res = {
    adr: json.suggestions[0].data.adr,
    c: json.suggestions[0].data.c,
    cnt: json.suggestions[0].data.cnt,
    listorg_id: json.suggestions[0].data.id,
    inn: json.suggestions[0].data.inn,
    ogrn: json.suggestions[0].data.ogrn,
    wrk: json.suggestions[0].data.adr,
    title_short: json.suggestions[0].value,
  };
  // await new Promise(r => setTimeout(r, parseInt(Math.random() * 20) * 10));
  r = await fetch(`https://www.list-org.com/company/${res.listorg_id}/report`);
  let html = await r.text();
  if (html.includes('404 ошибка')) {
    console.warn(`Warn: no report ${ogrn}`);
    return res;
  }
  const dom = new jsdom.JSDOM(html);
  // res.title = dom.window.document.querySelector('table:nth-child(1) > tbody > tr > td:nth-child(2) > a').textContent;
  const tableElement = dom.window.document.querySelector('#rep_table');
  res.report = tableElement.getAttribute('data-years').split(',').map((year, i) => {
    let income = null;
    let outcome = null;
    try {
      income = parseFloat(Array.from(tableElement.querySelectorAll('td')).find(el => el.textContent === 'Ф2.2110').parentNode.childNodes[3 + i].textContent) * 1000;
    } catch {}
    try {
      outcome = parseFloat(Array.from(tableElement.querySelectorAll('td')).find(el => el.textContent === 'Ф2.2120').parentNode.childNodes[3 + i].textContent) * 1000;
    } catch {}
    return {
      year,
      income,
      profit: income - outcome,
    };
  });
  return res;
}

export async function fetchOrganizationsInfoFromListorg(organizations = []) {
  const res = {};
  console.log(`Items count: ${organizations.length}`);
  for (let i = 0; i < organizations.length; i++) {
    if ((i + 1) % 10 === 0) {
      console.log(`Items extracted: ${i + 1}`);
    }
    try {
      res[`${organizations[i]}`] = await fetchOrganizationInfoFromListorg(organizations[i]);
      // await new Promise(r => setTimeout(r, parseInt(Math.random() * 20) * 100));
    } catch(e) {
      await new Promise(r => setTimeout(r, parseInt(Math.random() * 3) * 1000 + 5000));
      console.error(`Items errored: ${i + 1} - ${organizations[i]}`);
      console.error(e)
    }
  }
  return res;
}

async function fetchOrganizationInfoFromPbnalog(ogrn = 1027700189604) {
  let params = {
    mode: 'search-ul-ext',
    page: 1,
    pageSize: 10,
    pbCaptchaToken: '',
    token: '',
    queryUlExt: ogrn,
    okvedUlExt: '',
    regionUlExt: '',
    arrearUlExt: '0;10000001',
    sschrUlExt: '0;10001',
    taxpayUlExt: '0;10000001',
    expenseUlExt: '0;10000001',
    revenueUlExt: '0;10000001',
    offenseUlExt: '',
    kgnUlExt: '',
    taxmodeUlExt: '',
    invalidUlExt: '',
    rsmpUlExt: '',
    protchUlExt: '',
    przdUlExt: '',
  };
  let response = await fetch('https://pb.nalog.ru/search-proc.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  });
  let json = await response.json();
  let token = json?.ul?.data?.[0]?.token;
  if (!token) {
    console.log(json)
    throw new Error('captcha');
  }
  params = {
    method: 'get-request',
    token,
  };
  await new Promise(r => setTimeout(r, parseInt(Math.random() * 10) * 2000));
  response = await fetch('https://pb.nalog.ru/company-proc.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  });
  json = await response.json();
  params = {
    method: 'get-response',
    token: json.token,
    id: json.id,
  };
  response = await fetch('https://pb.nalog.ru/company-proc.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params),
  });
  json = await response.json();
  return json;
}

export async function fetchOrganizationsInfoFromPbnalog(organizations = []) {
  const res = {};
  console.log(`Items count: ${organizations.length}`);
  for (let i = 0; i < organizations.length; i++) {
    if ((i + 1) % 10 === 0) {
      console.log(`Items extracted: ${i + 1}`);
    }
    try {
      res[`${organizations[i]}`] = await fetchOrganizationInfoFromPbnalog(organizations[i]);
      await new Promise(r => setTimeout(r, parseInt(Math.random() * 10) * 2000));
    } catch(e) {
      console.error(`Items errored: ${i + 1} - ${organizations[i]}`);
      console.error(e)
    }
  }
  return res;
}

export async function validateProductsTnveds(products, tnveds) {
  return products.map(el => {
    const t = el.product_tnved;
    el.product_tnved_orig = t;
    if (!t) {
      return el;
    }
    if (t.match(/\d\.\d/)) {
      el.product_tnved = t.replaceAll('.', '');
      if (el.product_tnved === '141230111') {
        el.product_tnved = '6210400000'
      }
      // console.log('"."', el.product_tnved);
      return el;
    }
    if (t.includes('или')) {
      el.product_tnved = t
        .split(/или/)
        .map(s => s.replaceAll(/[^\d]/g, ''))
        .filter(s => !!s)
        .join(';');
      // console.log('"ili"', el.product_tnved);
      return el;
    }
    let newT = t
      .split(/[,.;\u00A0\n]/)
      .map(s => s.replaceAll(/[\s\r\t]/g, ''))
      .filter(s => !!s)
      .join(';');
    if (t === '6302 60 000 0, 6302 91 000 0, 6302 51') {
      newT = '6302600000;630291;630251';
    }
    if (t === '14.12.30.111') {
      newT = '6210400000'
    }
    if (t === '9404 29, 9404 29 100 0, 9404 29 900 0') {
      newT = '940429;9404291000;9404299000';
    }
    if (t === '9404 29, 9404 29 900 0') {
      newT = '940429;9404299000';
    }
    if (t === '9404 29, 9404 29 100 0') {
      newT = '940429;9404291000';
    }
    if (newT === '9404;29;100;0;900') {
      console.log('wtf')
    }
    if (newT === '68069000000') {
      newT = '68069000';
    }
    if (newT === '621143621149') {
      newT = '621143;621149';
    }
    if (newT === 'ТНВЭД8419200000') {
      newT = '8419200000';
    }
    if (newT === '60011000000') {
      newT = '6001100000';
    }
    if (newT === '94033011100') {
      newT = '9403301100';
    }
    if (newT === '62113210000') {
      newT = '6211321000';
    }
    if (newT === '52085200000') {
      newT = '5208520000';
    }
    if (newT === '6403000000') {
      newT = '6403';
    }
    if (newT === '382490') {
      newT = '3824';
    }
    if (newT === '940600') {
      newT = '9406';
    }
    if (newT === '843230') {
      newT = '8432';
    }

    if (newT && !newT.includes(';') && newT.length > 10 && newT.length) {
      newT = newT.match(/(.{1,10})/g).join(';');
      // console.log(`"${el.product_tnved}"`, `"${newT}"`, el.product_name, el.product_spec);
    }
    // 4703;21;000;9
    if (newT.length === 13 && newT[4] === ';' && newT[7] === ';' && newT[11] === ';') {
      newT = newT.split(';').join('');
    }
    // 470321;0009
    if (newT.length === 11 && newT[6] === ';') {
      newT = newT.split(';').join('');
    }
    const newTRaw = newT.replaceAll(';', '');
    if (newTRaw.length > 10 && newTRaw.length % 10 === 0) {
      newT = newTRaw.match(/(.{1,10})/g).join(';');
    }
    if (newT === '6201926201;9962029262;0299620312;6203196203;2262032962;0342620349;6204126204;1962042262;0429620462;6204696211;3262113962;1142621149') {
      newT = '620192;620199;620292;620299;620312;620319;620322;620329;620342;620349;620412;620419;620422;620429;620462;620469;621132;621139;621142;621149';
    }
    if (newT === '6110116110;1961102061;1030611090') {
      newT = '611011;611019;611020;611030;611090';
    }
    if (newT === '9404;29;100;0;900') {
      newT = '9404291000';
    }
    if (newT === '9404;29;900;0') {
      newT = '9404299000';
    }
    if (newT === '9404;29;100;0') {
      console.log('wtf')
      newT = '9404291000';
    }
    if (newT === '940171;000') {
      newT = '940171000';
    }
    if (newT === '630260;0000;630291;630251') {
      newT = '6302600000;630291;630251'
    }
    if (newT === '621132;100') {
      newT = '621132100'
    }
    if (newT === '621142;100') {
      newT = '621142100'
    }
    if (newT === 'Д9403') {
      newT = '9403'
    }
    if (newT === '870422;87423') {
      newT = '870422;870423'
    }
    if (newT === '611691;000') {
      newT = '611691000'
    }
    if (newT === '611011;300') {
      newT = '611011300'
    }
    if (newT === '940') {
      newT = '94'
    }
    if (newT === '940360;900') {
      newT = '940360900'
    }
    if (newT === '630260;0000;630291;630251') {
      newT = '6302600000;6302910000;630251'
    }
    if (newT === '841869;000') {
      newT = '841869000'
    }
    if (newT === '621710;00000') {
      newT = '6217100000'
    }
    if (newT === '630260;0000;630291;630251') {
      newT = '6302600000;630291;630251'
    }
    if (newT === '6304110000;6341900000;6304920000;6304930000') {
      newT = '6304110000;6304920000;6304930000'
    }
    if (newT === '4307') {
      newT = '43'
    }
    if (newT === '141230111') {
      newT = '6210400000'
    }
    if (newT === '630260;0000;630291;630251') {
      newT = '6302600000;630291;630251'
    }
    if (newT === '623221000;620323100') {
      newT = '62032310'
    }
    if (newT === '60006210000;6006220000;6006230000;6006319000;6006329000;6006339000;6006900000') {
      newT = '6006210000;6006220000;6006230000;6006319000;6006329000;6006339000;6006900000'
    }
    // const parts = newT.split(';');
    // for (let i = 0; i < parts.length; i += 1) {
    //   if (i % 2)
    // }

    // if (newT.length > 11 && newT[6] === ';' && newT[11] === ';') {
    //   newT = newT.split(';').map(el => el.length === 4 ? `${el};` : el).join('').slice(0, -1);
    // }
    el.product_tnved = newT;
    if (!el.product_tnved) {
      el.product_tnved = null;
      return el;
    }
    return el;
  }).map(el => {
    if ( el.product_tnved) {
      el.product_tnved = [...new Set(el.product_tnved.split(';'))];
    }
    return el;
  });

  // return products.filter(el => {
  //   const t = el.product_tnved;
  //   return t && t.replaceAll(/[\s\d]/g, '');
  // }).map(el => el.product_tnved);
  // return tnveds.filter(t => {
  //   if (t && t.match(/\d\.\d/)) {
  //     return
  //   }
  //   // if (t && t.replaceAll(/[\s\d,\r\n;]/g, '')) {
  //   //   console.log(t);
  //   // }
  //   // if (t && t.replaceAll(/[\s\d]/g, '')) {
  //   //   return true;
  //   // }
  //   // return false;
  //   return t && !t.match(/,.;/);
  //
  // });
}

export async function fetchAndFixIncomes(organizationsInfo) {
  for (let [ogrn, org] of Object.entries(organizationsInfo).slice(0, 5)) {
    if (!org.inn) {
      org.report = null;
      continue;
    }
    console.log(org.inn);
    const response = await fetch(`https://egrul.itsoft.ru/${org.inn}.json`);
    const json = await response.json();
    if (!org.report?.length) {
      continue;
    }
    org.report.forEach((r, index) => {
      r.balance = r.income;
      r.income = null;
      organizationsInfo[ogrn].report[index].outcome = null;
      r.profit = null;
      if (!r.year) {
        return;
      }
      if (json?.fin) {
        const yearData = json.fin?.[`y${r.year}`]?.['@attributes'];
        if (yearData) {
          r.income = parseInt(yearData.income);
          r.outcome = parseInt(yearData.outcome);
          r.profit = r.income - r.outcome;
        }
      }
    });
    // console.log(org.inn, ogrn);
  }
  return organizationsInfo;
}

export default {
  downloadObjectAsJson,
  downloadJsonMeta,
  fetchMeta,
  fetchCustomsData,
  fetchTnved,
  fetchTnvedAll,
  fetchGispProducts,
  fetchGispProductsAll,
  fetchGispOrganizations,
  fetchGispOrganizationsAll,
  fetchNalogEgrulSearchToken,
  fetchOrganizationInfoFromListorg,
  fetchOrganizationsInfoFromListorg,
  fetchOrganizationInfoFromPbnalog,
  fetchOrganizationsInfoFromPbnalog,
  validateProductsTnveds,
  fetchAndFixIncomes,
};
