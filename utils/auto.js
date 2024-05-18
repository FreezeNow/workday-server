const axios = require('axios');

const dayjs = require('dayjs');
const { setWorkdays, getWorkdays } = require('./workday');
const request = axios.create({
  baseURL: `https://timor.tech`,
  headers: {
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
  },
});
let workdays = {};
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
      workdays[day] = 'true';
      break;
    case 1:
    case 2:
      workdays[day] = 'false';
      break;
  }
  setWorkdays(JSON.stringify(workdays));
};
const set30Workday = async () => {
  workdays = {};
  try {
    for (let i = 0; i < 30; i++) {
      const day = dayjs().add(i, 'day').format('YYYY-MM-DD');
      await setWorkday({ day });
    }
    console.log(JSON.parse(await getWorkdays()));
  } catch (error) {
    console.error(dayjs().format('YYYY-MM-DD HH:mm:ss'), '发生错误', error);
  }
};
set30Workday();
module.exports = {
  set30Workday,
};
