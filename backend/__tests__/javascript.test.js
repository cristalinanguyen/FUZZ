/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect.
 */

const parse = require('../../syntax/parser');
const analyze = require('../../semantics/analyzer');
const generate = require('../javascript-generator');

const fixture = {
  hello: [
    String.raw`show("Hello, world\n")`,
    String.raw`console.log("Hello, world\n")`,
  ],

  arithmetic: [
    String.raw`5 * -2 + 8`,
    String.raw`((5 * (-(2))) + 8)`,
  ],

  letAndAssign: [
    String.raw`fuzz num x = 3`,
    /let x_(\d+) = 3;/,
  ],

  // Fix this
  // call: [
  //   String.raw`function hey (num x) returnt x ~`,
  //   /function hey_\(x_\d+\) \{\s*};\s*f_\1\(1, ""\)/,
  // ],

  whileLoop: [
    String.raw`while 7 chill ~`,
    /while \(7\) \{\s*break\s*\}/,
  ],

  iphThen: [
    String.raw`iph 3 == 3 returnt 5 ~`,
    '((3 === 3) ? (5) : (null))',
  ],

  iphThenElz: [
    String.raw`if 3 == 3 returnt 5 ~ elz returnt 6 ~`,
    '((3 === 3) ? (5) : (6))',
  ],

  fuzzAsValue: [
    String.raw`print(fuzz str x = "dog" returnt cuddle(x, "s"))`,
    /console.log\(\(\(\) => \{\s*let x_(\d+) = "dog";\s*return x_\1.concat\("s"\);\s*\}\)\(\)\)/,
  ],
  
  returnExpressionSequence: [
    String.raw`fuzz f() int = let var x:= 1 in (1;nil;3)`,
    /function f_(\d+)\(\) {\s*let x_(\d+) = 1;\s*1;\s*null;\s*return 3\s*\};/,
  ],

  moreBuiltIns: [
    String.raw`(ord("x"); chr(30); substring("abc", 0, 1))`,
    /\("x"\).charCodeAt\(0\);\s*String.fromCharCode\(30\);\s*"abc".substr\(0, 1\)/,
  ],

  evenMoreBuiltIns: [
    String.raw`(not(1) ; size(""); exit(3))`,
    /\(!\(1\)\);\s*"".length;\s*process\.exit\(3\)/,
  ],
};

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source);
      analyze(ast);
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});