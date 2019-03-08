module.exports = class VariableDeclaration {
    constructor(id, initializers) {
        Object.assign(this, { id, initializers });
    }
}
