/* eslint-env mocha */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const spcConst = require('../spc_const.js');
const should = require('should');

describe('SPC Const Calculation Tests', function () {
  it('should calculate SPC Const for n = 2', function (done) {
    const spc2 = spcConst.getSpcConst(2);
    should(spc2.c4).equal(0.7978845608028654);
    should(spc2.A3).equal(2.6586807763582736);
    should(spc2.B3).equal(0.0);
    should(spc2.B4).equal(3.266531919288601);
    done();
  });
  it('should calculate SPC Const for n = 10', function (done) {
    const spc10 = spcConst.getSpcConst(10);
    should(spc10.c4).equal(0.9726592741215884);
    should(spc10.A3).equal(0.9753500771452291);
    should(spc10.B3).equal(0.28370555644201434);
    should(spc10.B4).equal(1.7162944435579857);
    done();
  });
  it('should calculate SPC Const for n = 25', function (done) {
    const spc25 = spcConst.getSpcConst(25);
    should(spc25.c4).equal(0.9896403755857041);
    should(spc25.A3).equal(0.6062808418107425);
    should(spc25.B3).equal(0.5647857094848989);
    should(spc25.B4).equal(1.435214290515101);
    done();
  });
  it('should calculate SPC Const for n = 50', function (done) {
    const spc50 = spcConst.getSpcConst(50);
    should(spc50.c4).equal(0.9949113046697337);
    should(spc50.A3).equal(0.4264340617305231);
    should(spc50.B3).equal(0.6961901084566514);
    should(spc50.B4).equal(1.3038098915433487);
    done();
  });
});
