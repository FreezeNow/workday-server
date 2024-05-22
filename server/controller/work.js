const dayjs = require('dayjs');
const { getDay } = require('../../utils/workday');
// 获取用户权限列表
const getWorkday = async (ctx, next) => {
  let workday = (await getDay(dayjs().format('YYYY-MM-DD'))) ?? false;
  if (workday) {
    workday = JSON.parse(workday);
  }
  ctx.body = {
    errorCode: 0,
    message: 'ok',
    data: {
      workday,
    },
  };
  await next();
};

module.exports = {
  getWorkday,
};
