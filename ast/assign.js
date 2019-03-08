module.exports = class Assign {
    constructor(target, source) {
        Object.assign(this, { target, source });
    }
}
