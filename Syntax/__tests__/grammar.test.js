/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of FUZZ
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
yoo! tests are so cool !

fuzz int x = 10
fuzz int y = 20

fuzz str test = "Fuzzies!"
fuzz bool question = cozy
fuzz bool bad = not_cozy

fuzzArr[str] strArr = ["a", "b", "c"]
fuzzArr[int] numArr = [0, 1, 2, 3]

fuzzDict<str, int> testDict = ["Op Systems": 545, "Compilers": 240, "Graphics: 940]

function dondi() 
  x = 12
  y = 2
  returnt x
~

iph (x >= y) 
  print ("Hi there /n")
~

iph (x <= y)
  print ("Wrong")
~
elz iph (x == y)
  print ("Nope /t")
~
elz
  print ("WOOHOO!")

iph (bad)
  fuzz q = x * 3
  fuzz w = y / 10
  fuzz v = x ** 3
~
elz
  fuzz r = x + y
~

while (question)
  x = x - 4
  iph (x == 0)
    chill
  ~
`;

describe('The syntax checker', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
