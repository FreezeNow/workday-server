module.exports = {
  name: "workday", // 应用名称
  script: "./index.js", // 实际启动脚本
  cwd: "./", // 当前工作路径
  watch: [
    // 监控变化的目录，一旦变化，自动重启
    "server",
    "utils",
  ],
  ignore_watch: [
    // 从监控目录中排除
    "node_modules",
    "logs",
    "public",
    "production",
  ],
  watch_options: {
    followSymlinks: false,
  },
  error_file: "./logs/app-err.log", // 错误日志路径
  out_file: "./logs/app-out.log", // 普通日志路径
  env: {
    NODE_ENV: "production", // 环境参数，当前指定为生产环境
    // NODE_ENV: "examination", // 环境参数，当前指定为测试环境
    // NODE_ENV: "development", // 环境参数，当前指定为开发环境
  },
};
