// 设置默认状态为开发模式
process.env.NODE_ENV ? null : (process.env.NODE_ENV = 'development');

// 服务器配置
const server = {
  port: process.env.NODE_ENV === 'development' ? 8848 : process.env.NODE_ENV === 'examination' ? 1 : 1,
  ip: process.env.NODE_ENV === 'development' ? 'localhost' : '',
};

console.log('当前环境', process.env.NODE_ENV);

module.exports = {
  // 服务器配置
  server,
};
