/*
 * Semantic Error Tests
 *
 * These tests check that the analyzer will reject programs with various
 * static semantic errors.
 */

const parse = require('../../Syntax/parser');
const Context = require('../context');

const errors = [
  ['use of undeclared variable', 'yoo! x = 1'],
  ['non integer if condition', 'yoo! iph "hello" returnt 5 ~'],
  ['non integer in add', 'yoo! 3 + "dog"'],
  ['non integer in subtract', 'yoo! "dog" - 5'],
  ['non integer in multiply', 'yoo! "dog" * 5'],
  ['non integer in divide', 'yoo! "dog" / 5'],
  ['non integer in exponent', 'yoo! "dog" ** 5'],
  ['types do not match in equality test', 'yoo! 2 == "dog"'],
  ['types do not match in inequality test', 'yoo! 2 > "dog"'],
  ['redeclaration of variable', 'yoo! fuzz num x = 1 fuzz num x = 2'],
  ['redeclared field', 'yoo! fuzz Dict<num> p = {r: 5, r: 6}'],
  ['no such field', 'yoo! fuzz Dict<num> p = {r: 5} fuzz num s = p.zzz'],
  ['subscript of nonarray', 'yoo! fuzz num x = 3 fuzz num y = x[0]'],
  ['call of nonfunction', 'yoo! fuzz num x = 1 fuzz num y = x(1)'],
  ['non integer subscript', 'yoo! fuzz Arr<num> x = [1, 2, 3] fuzz num y = x["three"]'],
  ['method body not enclosed', 'yoo! function cozy_coding() returnt cozy'],
  ['statement not enclosed', 'yoo! iph(coffee_cart) returnt "chai"'],
  ['incorrect comment', 'yoo! htt we love programming !!'],
  ['incompatible array types', 'yoo! fuzz Arr<str> cmsi_classes = ["programing lab", 186, "interaction design", 370]'],
  ['incompatible dictionary key/value types', 'yoo! fuzz Dict<num> fuzz_gang = ["Liam": 21, "Chris": 21, "Lina": "youngest"]'],
  ['returnt statement outside of function body', 'yoo! function cozy_coding() ~ returnt cozy'], 
  ['incompatible assignment types', 'yoo! fuzz num x = 10 fuzz str drink = "chai" fuzz str 10 = drink'],
  ['define array as dictionary', 'yoo! fuzz Arr<str> jacket_colors = {"Annie": "black", "Amelia": "gray", "Lina": "pink"}'],
  ['define dictionary as array', 'yoo! fuzz Dict<str> den = ["pumpkin muffin", "Kombucha", "cookie"]'], 
  
  // TODO: We need dozens more here....
];

describe('The semantic analyzer', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, (done) => {
      const astRoot = parse(program);
      expect(astRoot).toBeTruthy();
      expect(() => astRoot.analyze(Context.INITIAL)).toThrow();
      done();
    });
  });
});
