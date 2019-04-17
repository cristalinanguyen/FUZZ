const {
  ArrayExp, ArrayType, Assignment, BinaryExp, Binding, Break, Call, ExpSeq, Field,
  ForExp, Func, IdExp, IfExp, LetExp, Literal, MemberExp, NegationExp, Param,
  RecordExp, RecordType, SubscriptedExp, TypeDec, Variable, WhileExp,
} = require('../ast');

const { IntType, StringType, BoolType } = require('./builtins');

const check = require('./check');

ArrayExp.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  check.isArrayType(this.type);
  this.size.analyze(context);
  check.isInteger(this.size);
  //HERE
  this.fill.analyze(context);
  check.isBoolean(this.type);
  
  check.isAssignableTo(this.fill, this.type.memberType);
};

ArrayType.prototype.analyze = function (context) {
  this.memberType = context.lookupType(this.memberType);
};

Assignment.prototype.analyze = function (context) {
  this.source.analyze(context);
  this.target.analyze(context);
  check.isAssignableTo(this.source, this.target.type);
  check.isNotReadOnly(this.target);
};

Break.prototype.analyze = function (context) {
  check.inLoop(context);
};

BinaryExp.prototype.analyze = function (context) {
  this.left.analyze(context);
  this.right.analyze(context);
  //HERE
  if (/[-+*/&|]/.test(this.op)) {
    check.isInteger(this.left);
    check.isInteger(this.right);
  } else if (/<=?|>=?/.test(this.op)) {
    check.expressionsHaveTheSameType(this.left, this.right);
    check.isIntegerOrBoolean(this.left);
    check.isIntegerOrBoolean(this.right);
  } else {
    check.expressionsHaveTheSameType(this.left, this.right);
  }
  this.type = IntType;
};

Binding.prototype.analyze = function (context) {
  this.value.analyze(context);
};

Call.prototype.analyze = function (context) {
  this.callee = context.lookupValue(this.callee);
  check.isFunction(this.callee, 'Attempt to call a non-function');
  this.args.forEach(arg => arg.analyze(context));
  check.legalArguments(this.args, this.callee.params);
  this.type = this.callee.returnType;
};
//ADD TO OHM
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

IfExp.prototype.analyze = function (context) {
  this.test.analyze(context);
  check.isInteger(this.test, 'Test in iph');
  check.isBoolean(this.test, 'Test in iph');
  this.consequent.analyze(context);
  if (this.alternate) {
    this.alternate.analyze(context);
  }
};

LetExp.prototype.analyze = function (context) {
  const newContext = context.createChildContextForBlock();
  this.decs.filter(d => d.constructor === TypeDec).map(d => newContext.addType(d));
  this.decs.filter(d => d.constructor === Func).map(d => newContext.add(d));
  this.decs.filter(d => d.constructor === Func).map(d => d.analyzeSignature(newContext));
  this.decs.map(d => d.analyze(newContext));
  check.noRecursiveTypeCyclesWithoutRecordTypes(this.decs);
  this.body.map(e => e.analyze(newContext));
  if (this.body.length > 0) {
    this.type = this.body[this.body.length - 1].type;
  }
};

Literal.prototype.analyze = function () {
  if (typeof this.value === 'number') {
    this.type = IntType;
  } else if (typeof this.value === 'string') {
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
  check.isInteger(this.operand, 'Operand of negation');
  this.type = IntType;
};

Nil.prototype.analyze = function () {
  this.type = NilType;
};

Param.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  context.add(this);
};

RecordExp.prototype.analyze = function (context) {
  this.type = context.lookupType(this.type);
  check.isRecordType(this.type);
  this.bindings.forEach((binding) => {
    const field = this.type.getFieldForId(binding.id);
    binding.analyze(context);
    check.isAssignableTo(binding.value, field.type);
  });
};

RecordType.prototype.analyze = function (context) {
  const usedFields = new Set();
  this.fields.forEach((field) => {
    check.fieldHasNotBeenUsed(field.id, usedFields);
    usedFields.add(field.id);
    field.analyze(context);
  });
};

RecordType.prototype.getFieldForId = function (id) {
  const field = this.fields.find(f => f.id === id);
  if (field === null) {
    throw new Error('No such field');
  }
  return field;
};

SubscriptedExp.prototype.analyze = function (context) {
  this.array.analyze(context);
  check.isArray(this.array);
  this.subscript.analyze(context);
  check.isInteger(this.subscript);
  this.type = this.array.type.memberType;
};

TypeDec.prototype.analyze = function (context) {
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
  check.isBoolean(this.test, 'Test in while');
  this.body.analyze(context.createChildContextForLoop());
};