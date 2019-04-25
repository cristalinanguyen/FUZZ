const { Func, Field, Type } = require('../ast');

const IntType = new Type('int');
const StringType = new Type('string');
const BoolType = new Type('boolean');

const standardFunctions = [
  new Func('show', [new Param('s', StringType)]),
  new Func('length', [new Param('s', StringType)], IntType),
  new Func('cuddle', [new Param('s', StringType), new Field('t', StringType),], StringType),
];

module.exports = { IntType, StringType, BoolType, standardFunctions };
