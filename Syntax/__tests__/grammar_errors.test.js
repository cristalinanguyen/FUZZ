const syntaxCheck = require('../syntax_checker');

const errors = [
  ['keyword as id', 'fuzz num iph = 5'],
  ['unclosed paren', 'fuzz num = (2 * 3'],
  ['unknown operator', 'x = 2^4'],
  ['unclosed comment', 'heres the thing: I like chai'],
  ['illegal start to comment', 'here: I like iced chai !!'],
  ['illegal start variable name', 'fuzz str $$ = "hey"']
];

describe('The syntax checker', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, (done) => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
});
