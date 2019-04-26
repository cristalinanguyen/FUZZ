/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of FUZZ
 */

const syntaxCheck = require('../syntax_checker');

const program = String.raw`
yoo!

fuzz num x = 10
fuzz num y = 2.5
fuzz str greet = "Hello, world"
fuzz bool yay = cozy
fuzz bool aww = not_cozy


`;

describe('The syntax checker', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
