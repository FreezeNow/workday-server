const axios = require('axios');

const dayjs = require('dayjs');
const { createClient } = require('redis');
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
const request = axios.create({
  baseURL: `http://timor.tech`,
});
const setWorkday = async ({ day } = {}) => {
  const response = await request({
    method: 'GET',
    url: `/api/holiday/info/${day}`,
  });
  const { data } = response;
  const { type, code } = data;
  if (code) {
    console.error(dayjs().format('YYYY-MM-DD HH:mm:ss'), '节假日接口服务器出错');
    return;
  }
  console.log(day, type);
  switch (type.type) {
    case 0:
    case 3:
      await client.set(day, 'true');
      break;
    case 1:
    case 2:
      await client.set(day, 'false');
      break;
  }
};
const set30Workday = async () => {
  try {
    for (let i = 0; i < 30; i++) {
      const day = dayjs().add(i, 'day').format('YYYY-MM-DD');
      await setWorkday({ day });
      console.log(day, JSON.parse(await client.get(day)));
    }
  } catch (error) {
    console.error(dayjs().format('YYYY-MM-DD HH:mm:ss'), '发生错误', error);
  }
};
set30Workday();
module.exports = {
  set30Workday,
};
