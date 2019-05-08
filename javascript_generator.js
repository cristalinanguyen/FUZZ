/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes, except
 * for types, and fields, which don’t figure into code generation. It exports a
 * function that generates a complete, pretty-printed JavaScript program for a
 * FUZZ expression, bundling the translation of the FUZZ standard library with
 * the expression's translation.
 *
 * Each gen() method returns a fragment of JavaScript.
 *
 *   const generate = require('./backend/javascript-generator');
 *   generate(fuzzGenerator);
 */

const beautify = require('js-beautify');
const {
  ArrayExp, Assignment, BinaryExp, Chill, Call, FunDec, IdExp, IphExp, Fuzz, Literal, DictExp, NegationExp, TypeDec, WhileExp
} = require('../ast');
const { StringType } = require('../semantics/builtins');

function makeOp(op) {
  return {'not=': '!=', '&': '&&', '|': '||', "not": "!"}[op] || op;
}

// javaScriptId(e) takes any FUZZ object with an id property, such as a Variable,
// Param, or Func, and produces a JavaScript name by appending a unique identifying
// suffix, such as '_1' or '_503'. It uses a cache so it can return the same exact
// string each time it is called with a particular entity.
const javaScriptId = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

const builtin = {
  show([s]) { return `console.log(${s})`; },
  length([s]) { return `${s}.length`; },
  cuddle([s, t]) { return `${s}.concat(${t})`; }
};

module.exports = function (exp) {
  return beautify(exp.gen(), { indent_size: 2 });
};

ArrayExp.prototype.gen = function () {
  return `Array(${this.size.gen()}).fill(${this.fill.gen()})`;
};

Assignment.prototype.gen = function () {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

BinaryExp.prototype.gen = function () {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

Chill.prototype.gen = function () {
  return 'chill';
};

Call.prototype.gen = function () {
  const args = this.args.map(a => a.gen());
  if (this.callee.builtin) {
    return builtin[this.callee.id](args);
  }
  return `${javaScriptId(this.callee)}(${args.join(',')})`;
};

Field.prototype.gen = function() {
  return `${this.id} : ${this.value.gen()}`;
};

Func.prototype.gen = function () {
  const name = javaScriptId(this);
  const params = this.params.map(javaScriptId);
  // "Void" functions do not have a JS return, others do
  const body = this.body.type ? makeReturn(this.body) : this.body.gen();
  return `function ${name} (${params.join(',')}) {${body}}`;
};

IdExp.prototype.gen = function () {
  return javaScriptId(this.ref);
};

IphExp.prototype.gen = function () {
  const thenPart = this.consequent.gen();
  const elsePart = this.alternate ? this.alternate.gen() : 'null';
  return `((${this.test.gen()}) ? (${thenPart}) : (${elsePart}))`;
};

Literal.prototype.gen = function () {
  return this.type === StringType ? `"${this.value}"` : this.value;
};

NegationExp.prototype.gen = function () {
  return `(- (${this.operand.gen()}))`;
};

VarDec.prototype.gen = function () {
  return `let ${javaScriptId(this)} = ${this.init.gen()}`;
};

WhileExp.prototype.gen = function () {
  return `while (${this.test.gen()}) { ${this.body.gen()} }`;
};
