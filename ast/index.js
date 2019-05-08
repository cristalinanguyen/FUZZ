class ArrayExp {
  constructor(type, size) {
    Object.assign(this, { type, size });
  }
}

class ArrayType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }
}

class AssignmentStatement {
    constructor(target, source) {
        Object.assign(this, { target, source });
    }
}

class Body {
  constructor(statements) {
      Object.assign(this, {statements});
  }
}

class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }
}

class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }
}

class Chill {
  analyze(context) {
    if (!context.inLoop) {
        throw new Error('Break statement is not inside the loop');
    }
  }
}

class DictExp {
  constructor(type, bindings) {
    Object.assign(this, { type, bindings });
  }
}

class DictType {
  constructor(fields) {
    Object.assign(this, { fields });
  }
}

class Field {
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
}

class Func {
  constructor(id, returnType, params, body) {
    Object.assign(this, { id, returnType, params, body });
  }
}

class IdExp {
  constructor(ref) {
    Object.assign(this, { ref });
  }
}

class IphExp {
  constructor(test, consequent, alternate) {
    Object.assign(this, { test, consequent, alternate });
  }
}

class Literal {
  constructor(value) {
    Object.assign(this, { value });
  }
}

class MemberExp {
  constructor(record, id) {
    Object.assign(this, { record, id });
  }
}

class NegationExp {
  constructor(operand) {
    Object.assign(this, { operand });
  }
}

class Param {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }
}

class Parens {
  constructor(_1, exp, _2) {
    Object.assign(this, {exp});
  }
}

class PrimType {
  constructor(name) {
    Object.assign(this, { name });
  }
}

class Program {
  constructor(body) {
    Object.assign(this, {body});
  }
}

class Returnt {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }
}

class SubscriptedExp {
  constructor(array, subscript) {
    Object.assign(this, { array, subscript });
  }
}

class Type {
  constructor(id) {
    Object.assign(this, { id });
  }
}

class VarDec {
  constructor(type, id, init) {
    Object.assign(this, { type, id, init });
  }
}

class WhileExp {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
}

module.exports = {
  ArrayExp, ArrayType, AssignmentStatement, Body, BinaryExpression, Call, Chill, DictExp, DictType, Field,
  Func, IdExp, IphExp, Literal, MemberExp, Param, Parens, PrimType, Program, Returnt, NegationExp, SubscriptedExp,
  Type, VarDec, WhileExp,
};
