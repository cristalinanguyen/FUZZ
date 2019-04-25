/*
 * Semantic Error Tests
 *
 * These tests check that the analyzer will reject programs with various
 * static semantic errors.
 */

const parse = require('../../Syntax/parser');
const Context = require('../context');

const errors = [
  ['use of undeclared variable', 'x = 1'],
  ['non integer if condition', 'iph "hello" returnt 5 ~'],
  ['non integer in add', '3 + "dog"'],
  ['non integer in subtract', '"dog" - 5'],
  ['non integer in multiply', '"dog" * 5'],
  ['non integer in divide', '"dog" / 5'],
  ['non integer in exponent', '"dog" ** 5'],
  ['types do not match in equality test', '2 == "dog"'],
  ['types do not match in inequality test', '2 > "dog"'],
  ['redeclaration of variable', 'fuzz x = 1 fuzz x = 2'],
  ['redeclared field', 'fuzzDict p = {r: int, r: int}'],
  ['no such field', 'fuzzDict p = {r: int} fuzz s = p.zzz'],
  ['subscript of nonarray', 'fuzz x = 3 fuzz y = x[0]'],
  ['call of nonfunction', 'fuzz x = 1 fuzz y = x(1)'],
  ['non integer subscript', 'fuzzArr x = [1, 2, 3] fuzz y = x["three"]'],
  ['method body not enclosed', 'function cozy_coding() returnt cozy'],
  ['statement not enclosed', 'iph(coffee_cart) returnt "chai"'],
  ['incorrect comment', 'yo! we love programming !!'],
  ['incompatible array types', 'fuzzArr cmsi_classes = ["programing lab", 186, "interaction design", 370]'],
  ['incompatible dictionary key/value types', 'fuzzDict fuzz_gang = ["Liam": 21, "Chris": 21, "Lina": "youngest"]'],
  ['returnt statement outside of function body', 'function cozy_coding() ~ ~ returnt cozy'], 
  ['incompatible assignment types', 'fuzz x = 10 fuzz drink = "chai" 10 = drink'],
  ['define array as dictionary', 'fuzzArr jacket_colors = {"Annie": "black", "Amelia": "gray", "Lina": "pink"}'],
  ['define dictionary as array', 'fuzzDict den = ["pumpkin muffin", "Kombucha", "cookie"]'], 
  
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
