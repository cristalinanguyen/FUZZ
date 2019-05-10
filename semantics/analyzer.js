const {
  ArrayExp, AssignmentStatement, BinaryExpression, Body, Call, Chill, DictExp, Field,
  Func, IdExp, IphExp, Literal, MemberExp, Param, Program, Returnt, NegationExp, SubscriptedExp,
  Type, VarDec, WhileExp,
} = require('../ast');

const { NumType, StringType, BoolType } = require('./builtins');

const check = require('./check');

ArrayExp.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  check.isArrayType(this.type);
  check.isNumber(this.size);
  check.isBoolean(this.type);
  check.isAssignableTo(this.type.memberType);
};

AssignmentStatement.prototype.analyze = function (context) {
  this.source.analyze(context);
  this.target.analyze(context);
  check.isAssignableTo(this.source, this.target.type);
  check.isNotReadOnly(this.target);
};

BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (/\*\*|[-+*/]/.test(this.op)) {
    check.isNumber(this.left);
    check.isNumber(this.right);
  } else if (/[&|]/.test(this.op)) {
    check.isBoolean(this.left);
    check.isBoolean(this.right);
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isNumber(this.left);
    check.isNumber(this.right);
  } else {
    check.expressionsHaveTheSameType(this.left, this.right);
  }
  this.type = NumType;
};

Body.prototype.analyze = function (context) {
  this.statements.forEach(s => s.analyze(context));
};

Call.prototype.analyze = function (context) {
  this.callee = context.lookupValue(this.callee);
  check.isFunction(this.callee, 'Attempt to call a non-function');
  this.args.forEach(arg => arg.analyze(context));
  check.legalArguments(this.args, this.callee.params);
  this.type = this.callee.returnType;
};

Chill.prototype.analyze = function (context) {
  check.inLoop(context);
};

Field.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
};

// Function analysis is broken up into two parts in order to support (nutual)
// recursion. First we have to do semantic analysis just on the signature
// (including the return type). This is so other functions that may be declared
// before this one have calls to this one checked.

Func.prototype.analyze = function (context) {
  const bodyContext = context.createChildContextForFunctionBody();
  this.params.forEach(p => p.analyze(bodyContext));
  this.body.statements.forEach(s => s.analyze(bodyContext));
};

IdExp.prototype.analyze = function (context) {
  this.ref = context.lookupValue(this.ref);
  this.type = this.ref.type;
};

IphExp.prototype.analyze = function (context) {
  this.test.analyze(context);
  check.isNumber(this.test, 'Test in iph');
  this.consequent.analyze(context);
  if (this.alternate) {
    this.alternate.analyze(context);
  }
  check.isBoolean(this.test, 'Test in iph');
  this.consequent.analyze(context);
  if (this.alternate) {
    this.alternate.analyze(context);
  }
};

Literal.prototype.analyze = function () {
  if (typeof this.value === 'number') {
    this.type = NumType;
  } else if ((/^(not_)?cozy$/).test(this.value)) {
    this.type = BoolType;
  } else {
    this.type = StringType;
  }
};

MemberExp.prototype.analyze = function (context) {
  this.record.analyze(context);
  check.isRecord(this.record);
  const field = this.record.type.getFieldForId(this.id);
  this.type = field.type;
};

NegationExp.prototype.analyze = function (context) {
  this.operand.analyze(context);
  check.isNumber(this.operand, 'Operand of negation');
  this.type = NumType;
  check.isBoolean(this.operand, 'Operand of negation');
  this.type = BoolType;
};

Param.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  context.add(this);
};

Program.prototype.analyze = function (context) {
  this.body.analyze(context);
};

Returnt.prototype.analyze = function (context) {
    this.returntValue.analyze(context);
    context.assertInFunction("Returnt statement not in function");
};

DictExp.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  check.isDictType(this.type);
  this.bindings.forEach((binding) => {
    const field = this.type.getFieldForId(binding.id);
    binding.analyze(context);
    check.isAssignableTo(binding.value, field.type);
  });
};

SubscriptedExp.prototype.analyze = function (context) {
  this.array.analyze(context);
  check.isArray(this.array);
  this.subscript.analyze(context);
  check.isNumber(this.subscript);
  this.type = this.array.type.memberType;
  check.isString(this.subscript);
  this.type = this.array.type.memberType;
  check.isBoolean(this.subscript);
  this.type = this.array.type.memberType;
};

Type.prototype.analyze = function (context) {
  this.type = context.lookup(this.type)
};

VarDec.prototype.analyze = function (context) {
  this.init.analyze(context);
  if (this.type) {
    this.type = context.lookupType(this.type.id);
    check.isAssignableTo(this.init, this.type);
  } else {
    // Yay! type inference!
    this.type = this.init.type;
  }
  context.add(this);
};

WhileExp.prototype.analyze = function (context) {
  this.test.analyze(context);
  check.isNumber(this.test, 'Test in while');
  check.isBoolean(this.test, 'Test in while');
  this.body.analyze(context.createChildContextForLoop());
};
