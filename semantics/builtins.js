const { Func, Field, PrimitiveType } = require('../ast');

const IntType = new PrimitiveType('int');
const StringType = new PrimitiveType('string');
const BoolType = new PrimitiveType('boolean');

const standardFunctions = [
  new Func('print', [new Param('s', StringType)]),
  new Func('flush', []),
  new Func('getchar', [], StringType),
  new Func('ord', [new Field('s', StringType)], IntType),
  new Func('chr', [new Field('x', IntType)], StringType),
  new Func('size', [new Field('s', StringType)], IntType),
  new Func('substring', [
    new Field('s', StringType),
    new Field('first', IntType),
    new Field('n', IntType),
  ], StringType),
  new Func('concat', [
    new Field('s', StringType),
    new Field('t', StringType),
  ], StringType),
  new Func('not', [new Field('x', IntType)], IntType),
  new Func('exit', [new Field('code', IntType)]),
];

module.exports = { IntType, StringType, BoolType, standardFunctions };
