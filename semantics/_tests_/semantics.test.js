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
  iph (x > y) 
    showBool (cozy)
  ~
  elz iph (x == y)
    showBool (not_cozy)
  ~
  elz
    showStr (greet)
  ~
fuzz Arr<str> names = ["Liam", "Chris", "Lina", "Meelz", "Annie", "Soph"]
fuzz Dict<num> age = {Annie: 21, Lina: 20}
while (x > y & y > 0)
  y = y * 2
  iph (y == 5 | x == 20)
    chill
  ~
~
fuzz num a = x + y
fuzz num b = x - y
fuzz num c = x / y
fuzz num d = x ** y
fuzz str arr_test = names[0]
fuzz str dict_test = age.Annie ~;


describe('The semantic analyzer', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    astRoot.analyze(Context.INITIAL);
    expect(astRoot).toBeTruthy();
    done();
  });
});
