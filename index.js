const server = require('./server/server.js');
const auto = require('./utils/auto.js');
// 开启服务器
server.start();

setTimeout(() => {
  // 定时查询，当时间为凌晨1点时，插入到数据库
  setInterval(() => {
    const date = new Date();
    switch (date.getHours()) {
      case 1: {
        auto.set30Workday();
        break;
      }
    }
  }, 1000 * 3600);
}, (59 - new Date().getMinutes()) * 60 * 1000);

