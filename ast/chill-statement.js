module.exports = class ChillStatement {
    analyze(context) {
        if (!context.inLoop) {
            throw new Error('Break statement is not inside the loop');
        }
    }
}
