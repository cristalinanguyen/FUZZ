module.exports = class PhorStatement {
    constructor(id, test, increment, body) {
        Object.assign(this, { id, test, increment, body });
    }
}
