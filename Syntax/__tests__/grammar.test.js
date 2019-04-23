/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of FUZZ
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
yoo! tests are so cool !

fuzz x = 10
fuzz y = 20
fuzz z = 12.5

fuzz test = "Fuzzies!"
fuzz question = cozy
fuzz bad = not_cozy

fuzzArr strArr = ["a", "b", "c"]
fuzzArr numArr = [0, 1, 2, 3]

fuzzDict testDict = ["Op Systems": 5.45, "Compilers": 2.40, "Graphics: 9,40]

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
