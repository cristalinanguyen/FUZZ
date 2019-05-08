const util = require('util');
const { ArrayType, Func, DictType, IdExp } = require('../ast');
const { IntType, StringType, BoolType } = require('./builtins');

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
module.exports = {
  // Is this type an array type?
  isArrayType(type) {
    doCheck(type.constructor === ArrayType, 'Not an array type');
  },

  isDictType(type) {
    doCheck(type.constructor === DictType, 'Not a record type');
  },

  // Is the type of this expression an array type?
  isArray(expression) {
    doCheck(expression.type.constructor === ArrayType, 'Not an array');
  },

  isDict(expression) {
    doCheck(expression.type.constructor === DictType, 'Not a record');
  },

  isNumber(expression) {
    doCheck(expression.type === NumType, 'Not an number');
  },

  isString(expression) {
    doCheck(expression.type === StringType, 'Not a string');
  },
  
  isBoolean(expression) {
    doCheck(expression.type === BoolType, 'Not a boolean');
  },

  isFunction(value) {
    doCheck(value.constructor === Func, 'Not a function');
  },

  // Are two types exactly the same?
  expressionsHaveTheSameType(e1, e2) {
    doCheck(e1.type === e2.type, 'Types must match exactly');
  },

  // Can we assign expression to a variable/param/field of type type?
  isAssignableTo(expression, type) {
    doCheck(
      (type.constructor === DictType) || (expression.type === type),
      `Expression of type ${util.format(expression.type)} not compatible with type ${util.format(type)}`,
    );
  },

  isNotReadOnly(lvalue) {
    doCheck(
      !(lvalue.constructor === IdExp && lvalue.ref.readOnly),
      'Assignment to read-only variable',
    );
  },

  fieldHasNotBeenUsed(field, usedFields) {
    doCheck(!usedFields.has(field), `Field ${field} already declared`);
  },

  // Same number of args and params; all types compatible
  legalArguments(args, params) {
    doCheck(args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`);
    args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
  },

};
