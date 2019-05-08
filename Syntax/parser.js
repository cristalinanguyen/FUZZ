const fs = require('fs');
const ohm = require('ohm-js');

const {
  ArrayExp, ArrayType, AssignmentStatement, BinaryExpression, Body, Call, Chill, DictExp, DictType, Field,
  Func, IdExp, IphExp, Literal, MemberExp, Param, Parens, Program, Returnt, NegationExp, SubscriptedExp,
  Type, VarDec, WhileExp,
} = require('../ast');

const grammar = ohm.grammar(fs.readFileSync('Syntax/FUZZ.ohm'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  
  Program(_1, body) {
    return new Program(body.ast())
  },
  Body(statement) {
    return new Body(statement.ast())
  },
  //  VarDec       = "fuzz" Type id "=" Exp

  VarDec(_1, type, id, _2, exp) {
    return new VarDec(type.ast(), id.ast(), exp.ast());
  },
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
  Type(type) {
    return new Type(type.ast());
  },
  FunDec(_fun, id1, typeid, _lp, params, _rp, body, _slipper) {
    return new Func(id1.ast(), arrayToNullable(typeid.ast()), params.ast(), body.ast());
  },
  Param(typeid, id) {
    return new Param(typeid.ast(), id.ast());
  },
  Field(id, _1, typeid) {
    return new Field(id.ast(), typeid.ast());
  },
  Exp_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
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
    return new Parens(exp.ast());
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
  ArrayExp( _1, exp, _2,) {
    return new ArrayExp(exp.ast());
  },
  DictExp( _1, fields, _2) {
    return new DictExp(fields.ast());
  },
  Type_array(_1, _2, type, _3) {
    return new ArrayType(type.ast());
  },
  Type_dict(_1, _2, type, _3) {
    return new DictType(type.ast());
  },
  Call(callee, _1, args, _2) {
    return new Call(callee.ast(), args.ast());
  },
  Returnt(_1, e) {
    return new Returnt(arrayToNullable(e.ast()));
  }, 
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  numlit(digits, _1, decimal) {
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
