const { writeFile, readFile } = require('fs/promises');

const getDay = async (date) => {
  const workdaySr = await readFile('./workdays.json', { encoding: 'utf8' });
  const workday = JSON.parse(workdaySr);
  return workday[date];
};
const getWorkdays = async () => {
  const workdaySr = (await readFile('./workdays.json').catch(() => ({}))) ?? {};
  const workday = JSON.parse(workdaySr);
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
