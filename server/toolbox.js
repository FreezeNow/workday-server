const fs = require('fs');
// 写文件
/**
 *
 * @param {String} pathname
 * @param {detaBuffer} dataBuffer
 */
const writeFile = (pathname, dataBuffer) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathname, dataBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log('保存成功！'));
      }
    });
  });
};
const isBigTen = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

const getNowDate = () => {
  const nowDate = new Date();
  return `${nowDate.getFullYear()}-${isBigTen(nowDate.getMonth() + 1)}-${isBigTen(nowDate.getDate())}`;
};

const getNowTime = () => {
  const nowDate = new Date();
  return `${nowDate.getFullYear()}-${isBigTen(nowDate.getMonth() + 1)}-${isBigTen(nowDate.getDate())} ${isBigTen(
    nowDate.getHours()
  )}:${isBigTen(nowDate.getMinutes())}:${isBigTen(nowDate.getSeconds())}`;
};

const getRandomId = () => new Date().getTime() + Math.floor(100000 + Math.random() * 900000).toString();
const timestampToTime = (timestamp) => {
  const nowDate = new Date(timestamp);
  return `${nowDate.getFullYear()}-${isBigTen(nowDate.getMonth() + 1)}-${isBigTen(nowDate.getDate())} ${isBigTen(
    nowDate.getHours()
  )}:${isBigTen(nowDate.getMinutes())}:${isBigTen(nowDate.getSeconds())}`;
};
const timestampToDate = (timestamp) => {
  const nowDate = new Date(timestamp);
  return `${nowDate.getFullYear()}-${isBigTen(nowDate.getMonth() + 1)}-${isBigTen(nowDate.getDate())}`;
};
const getRandomStr = (num) => {
  const str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  let resultStr = '';
  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * str.length);
    resultStr += str.charAt(random);
  }
  return resultStr;
};
const getRandomSixStr = () => getRandomStr(6);
const changeTimeFormat = (createTime) => {
  const createTimeArr = createTime.split('/');
  const dateArr = createTimeArr[0].split('-');
  const timeArr = createTimeArr[1].split(':');
  const year = Number(dateArr[0]);
  const month = Number(dateArr[1]);
  const date = Number(dateArr[2]);
  const hour = Number(timeArr[0]);
  const minute = Number(timeArr[1]);

  const now = new Date();
  const nowYead = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  if (year === nowYead) {
    if (month === nowMonth) {
      if (date <= nowDate) {
        if (date === nowDate) {
          if (hour === nowHour) {
            if (nowMinute - minute <= 1) {
              return '刚刚';
            }
            return `${nowMinute - minute}分钟前`;
          }
          return `今天 ${isBigTen(hour)}:${isBigTen(minute)}`;
        }
      }
    }
    return `${isBigTen(month)}月${isBigTen(date)}日 ${isBigTen(hour)}:${isBigTen(minute)}`;
  }
  return `${year}-${isBigTen(month)}-${isBigTen(date)} ${isBigTen(hour)}:${isBigTen(minute)}`;
};
module.exports = {
  writeFile,
  changeTimeFormat,
  isBigTen,
  getNowTime,
  getNowDate,
  getRandomId,
  getRandomSixStr,
  timestampToTime,
  timestampToDate,
};
// export {
//   changeTimeFormat,
//   isBigTen,
//   getNowTime,
//   getNowDate,
//   getRandomId
// };
// export default {
//   changeTimeFormat,
//   isBigTen,
//   getNowTime,
//   getNowDate,
//   getRandomId
// };
