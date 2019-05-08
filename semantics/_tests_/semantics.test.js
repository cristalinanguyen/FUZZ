/*
 * Semantics Success Test
 *
 * These tests check that the semantic analyzer correctly accepts a program that passes
 * all of semantic constraints specified by the language.
 */

const parse = require('../../Syntax/parser');
const Context = require('../context');

const program = String.raw`
yoo!
fuzz num x = 10
fuzz num y = 2.5
fuzz str greet = "Hello, world"
fuzz bool yay = cozy
fuzz bool aww = not_cozy

function test ()
  returnt cozy ~`;

/* fuzz bool s = x >= 1
fuzz bool t = y <= 0
fuzz bool u = x < 15 */

describe('The semantic analyzer', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    console.log(astRoot);
    astRoot.analyze(Context.INITIAL);
    expect(astRoot).toBeTruthy();
    done();
  });
});
