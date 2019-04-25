const {
  ArrayExp, AssignmentStatement, BinaryExpression, Call, Chill, DictExp, Field,
  Func, IdExp, IphExp, Literal, MemberExp, Param, NegationExp, SubscriptedExp,
  Type, Variable, WhileExp,
} = require('../ast');

const { NumType, StringType, BoolType } = require('./builtins');

const check = require('./check');

ArrayExp.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  check.isArrayType(this.type);
  this.size.analyze(context);
  check.isInteger(this.size);
  this.fill.analyze(context);
  check.isBoolean(this.type);
  check.isAssignableTo(this.fill, this.type.memberType);
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
    check.isInteger(this.left);
    check.isInteger(this.right);
  } else if (/[&|]/.test(this.op)) {
    check.isBoolean(this.left);
    check.isBoolean(this.right);
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isInteger(this.left);
    check.isInteger(this.right);
  } else {
    check.expressionsHaveTheSameType(this.left, this.right);
  }
  this.type = IntType;
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

Func.prototype.analyzeSignature = function (context) {
  this.bodyContext = context.createChildContextForFunctionBody();
  this.params.forEach(p => p.analyze(this.bodyContext));
  this.returnType = context.lookupType(this.returnType);
};

Func.prototype.analyze = function () {
  this.body.analyze(this.bodyContext);
  check.isAssignableTo(this.body, this.returnType, 'Type mismatch in function return');
};

IdExp.prototype.analyze = function (context) {
  this.ref = context.lookupValue(this.ref);
  this.type = this.ref.type;
};

IphExp.prototype.analyze = function (context) {
  this.test.analyze(context);
  check.isInteger(this.test, 'Test in iph');
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
    this.type = IntType;
  } else if (typeof this.value === 'string') {
    this.type = StringType;
  } else if (typeof this.value === 'boolean') {
    this.type = BoolType;
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
  check.isInteger(this.operand, 'Operand of negation');
  this.type = IntType;
  check.isBoolean(this.operand, 'Operand of negation');
  this.type = BoolType;
};

Param.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  context.add(this);
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
  check.isInteger(this.subscript);
  this.type = this.array.type.memberType;
  check.isString(this.subscript);
  this.type = this.array.type.memberType;
  check.isBoolean(this.subscript);
  this.type = this.array.type.memberType;
};

Type.prototype.analyze = function (context) {
  this.type.analyze(context);
};

Variable.prototype.analyze = function (context) {
  this.init.analyze(context);
  if (this.type) {
    this.type = context.lookupType(this.type);
    check.isAssignableTo(this.init, this.type);
  } else {
    // Yay! type inference!
    this.type = this.init.type;
  }
  context.add(this);
};

WhileExp.prototype.analyze = function (context) {
  this.test.analyze(context);
  check.isInteger(this.test, 'Test in while');
  this.body.analyze(context.createChildContextForLoop());
  check.isBoolean(this.test, 'Test in while');
  this.body.analyze(context.createChildContextForLoop());

};
