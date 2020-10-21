const gamma = require('gamma');
module.exports.getSpcConst = function (n) {
  const spcConst = {};
  spcConst.c4 = Math.sqrt(2 / (n - 1)) * gamma(n / 2) / gamma((n - 1) / 2);
  spcConst.A3 = 3 / (spcConst.c4 * Math.sqrt(n));
  const temp = 3 / spcConst.c4 * Math.sqrt(1 - (spcConst.c4 * spcConst.c4));
  spcConst.B3 = Math.max(1 - temp, 0.0);
  spcConst.B4 = 1 + temp;
  return spcConst;
};
