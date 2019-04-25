const syntaxCheck = require('../syntax_checker');

const errors = [
  ['keyword as id', 'yoo! fuzz num iph = 5'],
  ['unclosed paren', 'yoo! fuzz num = (2 * 3'],
  ['unknown operator', 'yoo! x = 2^4'],
  ['unclosed comment', 'yoo! heres the thing: I like chai'],
  ['illegal start to comment', 'yoo! here: I like iced chai !!'],
  ['illegal start variable name', 'yoo! fuzz str $$ = "hey"'],
  ['unclosed array', 'yoo! fuzz Arr<num> class = [185,186,401'],
  ['unclosed dictionary', 'yoo! fuzz Dict<num> coffee_prices = {chai: 3.50, tea: 2.50, cold_brew: 4.00'],
  ['method body not enclosed', 'yoo! function cozy_coding() returnt cozy'],
  ['statement not enclosed', 'yoo! iph(coffee_cart) returnt "chai"']
];

describe('The syntax checker', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, (done) => {
      expect(syntaxCheck(program)).toBe(false);
      done();
    });
  });
});
