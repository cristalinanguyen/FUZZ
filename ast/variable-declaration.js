module.exports = class VariableDeclaration {
    constructor(id, initializer) {
        Object.assign(this, { id, initializer });
    }
}
