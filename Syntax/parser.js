const ohm = require('ohm-js');
const fs = require('fs');
const withIndents = require('./preparser.js');

const Program = require('../ast/program');
const Statement = require('../ast/statement');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const WhileStatement = require('../ast/while-statement');
const ChillStatement = require('../ast/chill');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const FunctionCall = require('../ast/function-call');
const FunctionDeclaration = require('../ast/function-declaration');
const Returnt = require('../ast/returnt');
const PhorStatement = require('../ast/phor-statement');
const Case = require('../ast/case');
const IphStatement = require('../ast/iph-statement');
const ListExpression = require('../ast/list');
const ListTypeExpression = require('../ast/list-type');
const TypeDeclaration = require('../ast/type-declaration');
const IdentifierExpression = require('../ast/identifier-expression');


const grammar = ohm.grammar(fs.readFileSync('./syntax/FUZZ.ohm'));
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(_1, body, _2) { return new Program(simple-statement.ast()); },
  SimpleStatement(expressionsAndStatements) { return new Body(expressionsAndStatements.ast()); },
  
  //CREATE TESTS
  Conditional() {
    const tests = [];
    const bodies = [];
    const cases = tests.map((test, index) => new Case(test, bodies[index]));
    return new IphStatement(cases, unpack();
  },
  Statement_declaration(simple-statement, _) { return simple-statement.ast(); },
  Statement_assignment(simple-statement, _) { return simple-statement.ast(); },
  Statement_typedec(simple-statement, _) { return simple-statement.ast(); },
  Statement_returnt(returntStmt, _) { return returntStmt.ast(); },
  Statement_chill(_1, _2) { return new ChillStatement(); },
  Statement_expression(simple-statement, _) { return simple-statement.ast(); },
  Declaration(ids, _, exps) { return new VarDec(ids.ast(), exps.ast()); },
  Assignment(ids, _, exps) { return new VarAsgn(ids.ast(), exps.ast()); },
  Phor(_1, ids, _2, exps, _3, suite) {
    return new PhorStatement(ids.ast(), exps.ast(), suite.ast());
  },
  While(_1, exps, _2, simple-statement) { return new WhileStatement(exps.ast(), simple-statement.ast()); },
  TypeDec(_1, id, _2, sumType) { return new TypeDeclaration(id.ast(), sumType.ast()); },
  Returnt(_, e) { return new Returnt(e.ast()); },
  FuncDec(annotation, _1, signature, _2, simple-statement) {
    return new FunctionDeclaration(annotation.ast(), signature.ast(), suite.ast());
  },
  Exp0_and(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp0_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp4_unary(left, op) { return new BinaryExpression(op.ast(), left.ast()); },
  Exp5_parens(_1, expression, _2) { return expression.ast(); },
  VariableExpression(id) {
    return new IdentifierExpression(id.ast());
  },

  FuncCall(callee, _1, args, _2) { return new FunctionCall(callee.ast(), args.ast()); },
  SubscriptExp(id, _1, expression, _2) {
    return new SubscriptedExpression(id.ast(), expression.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() { return []; },
  varId(_1, _2) { return this.sourceString; },
  constId(_1, _2) { return this.sourceString; },
  boollit(_) { return new Boollit(this.sourceString === 'true'); },
  numlit(_1, _2, _3) { return new Numlit(+this.sourceString); },
  strlit(_1, chars, _2) { return new Strlit(this.sourceString); },
});

module.exports = (text) => {
  const match = grammar.match(withIndents(text));
  if (!match.succeeded()) {
    throw match.message;
  }

  return astGenerator(match).ast();
};
