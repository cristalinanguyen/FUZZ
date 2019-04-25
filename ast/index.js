class ArrayExp {
  constructor(type, size) {
    Object.assign(this, { type, size });
  }
}

class AssignmentStatement {
    constructor(target, source) {
        Object.assign(this, { target, source });
    }
}

class Body {
  constructor(statement) {
      Object.assign(this, {statement});
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

class Field {
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
}

class Func {
  constructor(id, params, returnType, body) {
    Object.assign(this, { id, params, returnType, body });
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
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
}

class PrimType {
  constructor(name) {
    Object.assign(this, { name });
  }
}

class Program {
  constuctor(name) {
    Object.assign(this, {name});
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
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
}

class VarDec {
  constructor(type, id, body) {
    Object.assign(this, { type, id, body });
  }
}

class WhileExp {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
}

module.exports = {
  ArrayExp, AssignmentStatement, Body, BinaryExpression, Call, Chill, DictExp, Field,
  Func, IdExp, IphExp, Literal, MemberExp, Param, PrimType, Program, Returnt, NegationExp, SubscriptedExp,
  Type, VarDec, WhileExp,
};
