const Koa = require('koa');
const router = require('./router/index.js');
const config = require('./config.js');
const error = require('./error.js');
const path = require('path');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const os = require('os');
const { getNowTime } = require('./toolbox.js');
const { createClient } = require('redis');
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

// 创建koa实例
const app = new Koa();
__dirname = path.resolve(process.argv[2] || '.');

const showUrl = async (ctx, next) => {
  console.log(getNowTime() + ', 请求ip: ' + (ctx.request.ips[0] ? ctx.request.ips[0] : ctx.request.ip));
  console.log(getNowTime() + ', 请求的接口: ' + ctx.URL.href);
  await next();
};
const configServer = config.server;

const server = {
  start() {
    // 打印日志
    app.use(logger());
    // 使用token时用，并进行错误打印
    app.use(async (ctx, next) => {
      ctx.state.tokenList = ['test'];
      ctx.state.error = error;
      ctx.state.config = {};
      ctx.state.redisClient = client;
      try {
        await next();
        const body = ctx.request.body;
        console.log('请求的body', body);
        console.log('响应体', ctx.body);
      } catch (error) {
        console.error(`${getNowTime()} ${ctx.url} 错误捕捉`, error.error ? error.error : error);
        ctx.body = error.errorCode
          ? {
              ...error,
            }
          : {
              errorCode: 995,
              message: '未知错误',
            };
      }
    });
    // 解决跨域
    app.use(cors());
    app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      await next();
    });
    // 打印请求ip来源
    app.use(showUrl);

    // 解析请求体
    app.use(
      bodyParser({
        enableTypes: ['json', 'form', 'text'],
        extendTypes: {
          text: ['text/xml', 'application/xml'],
        },
      })
    );
    // 挂载路由
    app.use(router.routes()).use(router.allowedMethods());

    const { port, ip } = configServer;
    // 开启服务器
    app.listen(port, ip);
    // 获取本机ip
    function getIPAdress() {
      var interfaces = os.networkInterfaces();
      for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            return alias.address;
          }
        }
      }
    }
    // 设置本机ip
    global.developer = {
      baseUrl: `http://${ip ? ip : getIPAdress()}:${port}`,
    };
    // 打印服务器ip
    console.log(global.developer.baseUrl);
    // 打印服务器端口
    console.log(`服务器已开启, 端口为${port}`);
  },
};
module.exports = server;

