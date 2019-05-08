const { Func, Param, Type } = require('../ast');

const NumType = new Type('num');
const StringType = new Type('string');
const BoolType = new Type('boolean');

const standardFunctions = [
  new Func('showStr', [new Param('s', StringType)]),
  new Func('showBool', [new Param('b', BoolType)]),
  new Func('showNum', [new Param('n', NumType)]),
  new Func('length', [new Param('s', StringType)], NumType),
  new Func('cuddle', [new Param('s', StringType), new Param('t', StringType),], StringType),
];

module.exports = { NumType, StringType, BoolType, standardFunctions };
