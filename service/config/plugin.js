'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

// 开启egg-mysql插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}

// 开启egg-cors插件
exports.cors = {
  enable: true,
  package: 'egg-cors'
}
