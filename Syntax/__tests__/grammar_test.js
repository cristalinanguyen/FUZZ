/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of FUZZ
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
yoo!
heres the thing: we're testing out our program !!

fuzz num x = 10
fuzz num y = 2.5
fuzz str greet = "Hello, world"
fuzz bool yay = cozy
fuzz bool aww = not_cozy

function test ()
  iph (x > y) 
    returnt cozy
  ~
  elz iph (x == y)
    return not_cozy
  ~
  elz
    print greet
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

fuzz str dict_test = age.Annie

fuzz bool s = (x >= 1)
fuzz bool t = (y <= 0)
fuzz bool u = (x < 15)
fuzz bool v = (x not= 5)

x = y



`;

describe('The syntax checker', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
