const fs = require('fs');
const exportList = [];

const files = fs.readdirSync('./server/controller');

for (let i = 0; i < files.length; i++) {
  const element = files[i];
  if (element.includes('index.js')) {
    continue;
  }
  exportList.push(require(`./${element}`));
}

const oExport = {};
Object.assign(oExport, ...exportList);
module.exports = oExport;
