const {
    ArrayExp, AssignmentStatement, BinaryExpression, Call, Chill, DictExp, Field,
    Func, IdExp, IphExp, Literal, MemberExp, Param, Program, NegationExp, SubscriptedExp,
    Type, VarDec, WhileExp,
} = require('../ast');

function isZero(e) {
  return e instanceof Literal && e.value === 0;
}

function isOne(e) {
  return e instanceof Literal && e.value === 1;
}

function bothLiterals(b) {
  return b.left instanceof Literal && b.right instanceof Literal;
}

ArrayExp.prototype.optimize = function () {
  this.size = this.size.optimize();
  this.fill = this.fill.optimize();
  return this;
};

AssignmentStatement.prototype.optimize = function () {
  this.target = this.target.optimize();
  this.source = this.source.optimize();
  if (this.target === this.source) {
    return null;
  }
  return this;
};

BinaryExpression.prototype.optimize = function () {
  this.left = this.left.optimize();
  this.right = this.right.optimize();
  if (this.op === '+' && isZero(this.right)) return this.left;
  if (this.op === '+' && isZero(this.left)) return this.right;
  if (this.op === '*' && isZero(this.right)) return new Literal(0);
  if (this.op === '*' && isZero(this.left)) return new Literal(0);
  if (this.op === '*' && isOne(this.right)) return this.left;
  if (this.op === '*' && isOne(this.left)) return this.right;
  if (bothLiterals(this)) {
    const [x, y] = [this.left.value, this.right.value];
    if (this.op === '+') return new Literal(x + y);
    if (this.op === '*') return new Literal(x * y);
    if (this.op === '/') return new Literal(x / y);
  }
  return this;
};

Chill.prototype.optimize = function () {
  return this;
};

Call.prototype.optimize = function () {
  this.args = this.args.map(a => a.optimize());
  this.callee = this.callee.optimize();
  return this;
};

<<<<<<< HEAD
=======
Field.prototype.optimize = function () {
  this.value = this.value.optimize();
  return this;
};

>>>>>>> a83fe098dd8c0f96ddd60c989c300967a899d1c3
Func.prototype.optimize = function () {
  if (this.body) {
    this.body = this.body.optimize();
  }
  return this;
};

IdExp.prototype.optimize = function () {
  return this;
};

IphExp.prototype.optimize = function () {
  this.test = this.test.optimize();
  this.consequent = this.consequent.optimize();
  this.alternate = this.alternate.optimize();
  if (isZero(this.test)) {
    return this.alternate;
  }
  return this;
};

Literal.prototype.optimize = function () {
  return this;
};

MemberExp.prototype.optimize = function () {
  this.record = this.record.optimize();
  return this;
};

SubscriptedExp.prototype.optimize = function () {
  this.array = this.array.optimize();
  this.subscript = this.subscript.optimize();
  return this;
};

NegationExp.prototype.optimize = function () {
  this.operand = this.operand.optimize();
  if (this.operand instanceof Literal) {
    return new Literal(-this.operand.value);
  }
  return this;
};

Param.prototype.optimize = function () {
  // Nothing to do in Tiger, since it does not have defaults
  return this;
};

VarDec.prototype.optimize = function () {
  this.init = this.init.optimize();
  return this;
};

WhileExp.prototype.optimize = function () {
  this.test = this.test.optimize();
  if (this.test instanceof Literal && !this.test.value) {
    // While-false is a no-operation, don't even need the body
    return new Nil();
  }
  this.body = this.body.optimize();
  return this;
};
