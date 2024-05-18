const { writeFile, readFile } = require('fs/promises');

const getDay = async (date) => {
  const workday = await readFile('./workdays.json');
  return workday[date];
};
const getWorkdays = async () => {
  const workday = (await readFile('./workdays.json').catch(() => ({}))) ?? {};
  return workday;
};

const setWorkdays = (workday) => {
  writeFile('./workdays.json', workday);
};
module.exports = {
  getDay,
  getWorkdays,
  setWorkdays,
};
