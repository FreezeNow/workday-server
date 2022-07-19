const Router = require('koa-router');
const controller = require('../controller/index.js');

const baseUrl = '';
const router = new Router();

router.get(`${baseUrl}/workday`, controller.getWorkday);

module.exports = router;
