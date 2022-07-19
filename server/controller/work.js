const dayjs = require('dayjs');
// 获取用户权限列表
const getWorkday = async (ctx, next) => {
  let workday = (await ctx?.state?.redisClient.get(dayjs().format('YYYY-MM-DD'))) ?? false;
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
