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
  Exp_iph(_1, test, _2, consequent, _3, alternate) {
    return new IphExp(test.ast(), consequent.ast(), arrayToNullable(alternate.ast()));
  },
  Exp_while(_1, test, _2, body) {
    return new WhileExp(test.ast(), body.ast());
  },
  Exp_assign(target, _1, source) {
    return new AssignmentStatement(target.ast(), source.ast());
  },
  Exp_chill(_1) {
    return new Chill();
  },
  TypeDec(_1, id, _2, type) {
    return new TypeDec(id.ast(), type.ast());
  },
  ArrayType(_1, _2, id) {
    return new ArrayType(id.ast());
  },
//   confused
  DictType(_1, fieldDecs, _2) {
    return new DictType(fieldDecs.ast());
  },
  FunDec(_1, id, _2, params, _4, _5, typeid, _6, body) {
    return new Func(id.ast(), params.ast(), arrayToNullable(typeid.ast()), body.ast());
  },
  VarDec(_1, id, _2, typeid, _3, init) {
    return new Variable(id.ast(), arrayToNullable(typeid.ast()), init.ast());
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
  Exp4_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp5_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp6_negation(_1, operand) {
    return new NegationExp(operand.ast());
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
  intlit(digits) {
    return new Literal(+this.sourceString);
  },
  stringlit(_1, chars, _6) {
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


// const fs = require('fs');
// const ohm = require('ohm-js');

// const VariableDeclaration = require('../ast/variable-declaration');
// const Statement = require('../ast/statement');
// const BooleanLiteral = require('../ast/boolean-literal');
// const NumericLiteral = require('../ast/numeric-literal');
// const StringLiteral = require('../ast/string-literal');
// const WhileStatement = require('../ast/while-statement');
// const ChillStatement = require('../ast/chill');
// const BinaryExpression = require('../ast/binary-expression');
// const UnaryExpression = require('../ast/unary-expression');
// const FunctionCall = require('../ast/function-call');
// const FunctionDeclaration = require('../ast/function-declaration');
// const ReturntStatement = require('../ast/returnt-statement');
// const PhorStatement = require('../ast/phor-statement');
// const IphStatement = require('../ast/iph-statement');
// const ListExpression = require('../ast/list');
// const TypeDeclaration = require('../ast/type-declaration');
// const IdentifierExpression = require('../ast/identifier-expression');


// const grammar = ohm.grammar(fs.readFileSync('./syntax/FUZZ.ohm'));
// const astGenerator = grammar.createSemantics().addOperation('ast', {
//   Program(_1, body, _2) { return new Program(simpleStatement.ast()); },
//   SimpleStatement(expressionsAndStatements) { return new Body(expressionsAndStatements.ast()); },

//   //CREATE TESTS
//   Conditional() {
//     const tests = [];
//     const bodies = [];
//     return new IphStatement(tests, bodies, unpack());
//   },
//   Statement_declaration(simpleStatement, _) { return simpleStatement.ast(); },
//   Statement_assignment(simpleStatement, _) { return simpleStatement.ast(); },
//   Statement_typedec(simpleStatement, _) { return simpleStatement.ast(); },
//   Statement_returnt(ReturntStatement, _) { return ReturntStatement.ast(); },
//   Statement_chill(_1, _2) { return new ChillStatement(); },
//   Statement_expression(simpleStatement, _) { return simpleStatement.ast(); },
//   Declaration(ids, _, exps) { return new VarDec(ids.ast(), exps.ast()); },
//   Assignment(ids, _, exps) { return new VarAsgn(ids.ast(), exps.ast()); },
//   Phor(_1, ids, _2, exps, _3, suite) {
//     return new PhorStatement(ids.ast(), exps.ast(), suite.ast());
//   },
//   While(_1, exps, _2, simpleStatement) { return new WhileStatement(exps.ast(), simpleStatement.ast()); },
//   TypeDec(_1, id, _2, sumType) { return new TypeDeclaration(id.ast(), sumType.ast()); },
//   Returnt(_, e) { return new ReturntStatement(e.ast()); },
//   FuncDec(annotation, _1, signature, _2, simpleStatement) {
//     return new FunctionDeclaration(annotation.ast(), signature.ast(), suite.ast());
//   },
//   Exp0_and(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
//   Exp0_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
//   Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
//   Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
//   Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
//   Exp4_unary(left, op) { return new BinaryExpression(op.ast(), left.ast()); },
//   Exp5_parens(_1, expression, _2) { return expression.ast(); },
//   VariableExpression(id) {
//     return new IdentifierExpression(id.ast());
//   },

//   FuncCall(callee, _1, args, _2) { return new FunctionCall(callee.ast(), args.ast()); },
//   SubscriptExp(id, _1, expression, _2) {
//     return new SubscriptedExpression(id.ast(), expression.ast());
//   },
//   NonemptyListOf(first, _, rest) {
//     return [first.ast(), ...rest.ast()];
//   },
//   EmptyListOf() { return []; },
//   varId(_1, _2) { return this.sourceString; },
//   constId(_1, _2) { return this.sourceString; },
//   boollit(_) { return new Boollit(this.sourceString === 'true'); },
//   numlit(_1, _2, _3) { return new Numlit(+this.sourceString); },
//   strlit(_1, chars, _2) { return new Strlit(this.sourceString); },
// });

// module.exports = (text) => {
//   const match = grammar.match(text);
//   if (!match.succeeded()) {
//     throw match.message;
//   }

//   return astGenerator(match).ast();
// };
