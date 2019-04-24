const fs = require('fs');
const ohm = require('ohm-js');

const {
  ArrayExp, ArrayType, AssignmentStatement, BinaryExpression, Call, Chill, DictExp, DictType, Field,
  Func, IdExp, IphExp, Literal, MemberExp, NegationExp,  SubscriptedExp,
  TypeDec, Variable, WhileExp,
} = require('../ast');

const grammar = ohm.grammar(fs.readFileSync('Syntax/FUZZ.ohm'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
Statement_iph(_1, test, body1,  _2, _3, consequent, body2,  _4, _5, alternate, _6) {
    return new IphExp(test.ast(), consequent.ast(), body1.ast(), body2.ast, arrayToNullable(alternate.ast()));
  },
  Statement_while(_1, test, _2, body) {
    return new WhileExp(test.ast(), body.ast());
  },
  Statement_assign(target, _1, source) {
    return new AssignmentStatement(target.ast(), source.ast());
  },
  Statement_chill(_1) {
    return new Chill();
  },
  TypeDec(_1, id, _2, type) {
    return new TypeDec(id.ast(), type.ast());
  },
  ArrayType(_1, _2, id) {
    return new ArrayType(id.ast());
  },
  DictType(_1, fieldDecs, _2) {
    return new DictType(fieldDecs.ast());
  },
  FunDec(_1, id, _2, params, _4, _5, typeid, _6, body) {
    return new Func(id.ast(), params.ast(), arrayToNullable(typeid.ast()), body.ast());
  },
  VarDec(_1, id, _2, init) {
    return new Variable(id.ast(), init.ast());
  },
  Field(id, _1, typeid) {
    return new Field(id.ast(), typeid.ast());
  },
  Exp1_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp2_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp3_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp4_negation(op, right) {
    return new NegationExp(op.ast(), right.ast());
  },
  Exp5_parens(_1, exp, _2) {
    return new ParensExpression(exp.ast());
  },
  Lvalue_id(id) {
    return new IdExp(id.ast());
  },
  Lvalue_subscripted(array, _1, subscript, _2) {
    return new SubscriptedExp(array.ast(), subscript.ast());
  },
  Lvalue_field(record, _1, id) {
    return new MemberExp(record.ast(), id.ast());
  },
  ArrayExp(type, _1, size, _2, _3, fill) {
    return new ArrayExp(type.ast(), size.ast(), fill.ast());
  },
  DictExp(type, _1, bindings, _2) {
    return new DictExp(type.ast(), bindings.ast());
  },
  Call(callee, _1, args, _2) {
    return new Call(callee.ast(), args.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  numlit(digits) {
    return new Literal(+this.sourceString);
  },
  strlit(_1, chars, _6) {
    return new Literal(this.sourceString.slice(1, -1));
  },
//   confused
  boollit(value) {
    return new Literal(this.sourceString);
  },
  id(_1, _2) {
    return this.sourceString;
  },
  _terminal() {
    return this.sourceString;
  },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
