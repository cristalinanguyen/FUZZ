class ArrayExp {
  constructor(type, size, fill) {
    Object.assign(this, { type, size, fill });
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

//HERE
class Dict {
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
class SetExp {
  constructor(type, bindings) {
    Object.assign(this, { type, bindings });
  }
}

class SetType {
  constructor(fields) {
    Object.assign(this, { fields });
  }
}

class SubscriptedExp {
  constructor(array, subscript) {
    Object.assign(this, { array, subscript });
  }
}

class TypeDec {
  constructor(id, type) {
    Object.assign(this, { id, type });
  }
}

class Variable {
  constructor(id, type, init) {
    Object.assign(this, { id, type, init });
  }
}

class WhileExp {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
}

module.exports = {
  ArrayExp, ArrayType, AssignmentStatement, BinaryExpression, Call, Chill, Dict, Field,
  ForExp, Func, IdExp, IphExp, Literal, MemberExp, NegationExp, Param,
  SetExp, SetType, SubscriptedExp, TypeDec, Variable, WhileExp,
};
