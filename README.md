# FUZZ++
Compiler Project for CMSI 488 at Loyola Marymount University by
ANNIE FLORA, AMELIA JAY, LIAM NAMBA, CRISTALINA NGUYEN, SOPHIA PROCHNOW, CHRISTIAN SANTANDER

![logo](https://user-images.githubusercontent.com/31746937/52384776-be8b2700-2a33-11e9-91c9-be75d5445533.jpeg)

## Introduction
FUZZ++ is a scripting language for all your cozy coding needs. Imagine, its raining outside, you're wearing your fuzzy jacket and your favorite pair of UGGs, and you didn't make it to class. You open your computer at home and can't wait to get your code on. You know that FUZZ++ is the go-to programming language for these types of #codingvibes. FUZZ++ is cozy, comfortable (with lots of practice), and most importantly fun!

## Features
- Data Structures
- Statically Typed
- Streams
- Iph (if) Statements
- While Loops

## Examples

### Data Types
- boolean: `cozy` and `not_cozy`
- string: `"my UGGs are soooo comfortable"`
- numbers: `1`, `100`, `420`,`1.5`, `3.14`, `70.34799`
- array: `[5, 6, 7, 8, 9, 10]`, `["compilers", "operating systems", "interaction design", "plang", "theory"]`

### Variable Declarations
Every new variable is declared using the keyword `fuzz` followed by its identifier.
```
fuzz annies_coffee_cart_order = "iced chai with almond milk and a shot"
fuzz num_of_juuls_chris_has_lost = 27
fuzz meels_favorite_snack = "hot cheetos"
fuzz dondi_wears_airpods = cozy
```

### Function Declarations

The tilde (~) is used to enclose method bodies, as well as group statements in 'iph' statements and 'while' loops.

```
function dondi_wearing_airpods()~
  returnt cozy
~

function bjohnson()~
  returnt "squirrel!"
~

function mins_forney_spends_erasing(int classes)~
  fuzz time = 8 * classes
  returnt time
~  

function toal_playing_vball(boolean weather)~
  iph (weather)~
    returnt cozy
~    
  elz ~
    returnt not_cozy
~

function dorin()~
  returnt "among friends"
~
```

### `iph` Statements
An `iph` statement executes the block of code inside the tildes `~`, if the specified condition is true. Iph statements can be followed by 0 or more `elz iph` statements and an optional `elz` statement which execute when the condition is false

```
iph weather == 1 ~
  fuzzies_wearing_jackets = cozy ~
  elz iph weather == 0 ~
  fuzzies_wearing_jackets = not_cozy ~
  elz ~
  return "I dont know what the fuzzies are wearing today." ~

```

### Comments
```
yoo! the Keckmas party was banging !!

```

### Arithmetic
```
fuzz sum = 2 + 4
fuzz difference = 4 - 2
fuzz product = 2 * 4
fuzz quotient = 4 / 2
fuzz exponent = 2 ** 4
```

### Data Structures
#### Arrays
An array is an ordered sequence of elements of the same type.
```
fuzzArr im_hungry = ["spicy tuna roll", "california roll", "salmon sashimi", "miso soup"];
```

#### Dictionaries
A dictionary stores pairs of elements as keys and values. All keys must be of the same type and all values must be of the same type.
```
fuzzDict example = {key: value};
fuzzDict vegan_food_prices = {"vegan burger": 5.50, "vegan chips": 2.99, "vegan romaine lettuce": 4.00};
```

#### Sets
A set is an unordered group of unique elements of the same type.
```
fuzzSet fuzzy_gang_gang = {"phi phi", "nini", "meelz", "lili", "leanz", "chrissykins"};
```


### Expressions
A FUZZ++ expression is one of the following:
- a boolean literal: `cozy` or `not_cozy`
- a numeric literal: `53`, `2.6`
- a string literal, delimited by single or double quotes (`'hi'`, or `"hi"`), containing any character except a newline, backslash, or quotes (these can be escaped as `\n`, `\\`, `\'`, and `\"`)
- a variable reference
- a function call
- an infix expression with any of the following operators: `&`, `|`, `<`, `<=`, `==`, `not=`, `>=`, `>`, `+`, `-`, `**`, `*`, `/`

### Statements
A FUZZ++ statement is one of the following:
- a variable declaration
- a function declaration
- an assignment statement (such as `a = b`, where `a` and `b` are both previously declared variables)
- a function call
- a `chill` statement (must appear in a loop and tells the program to chill out with that loop, break out of it, and move on to the code after the loop)
- a `returnt` statement (returns a value from a function; it is an error if `returnt` appears somewhere other than in a function body)
- an `iph`, `iph elz`, or `elz` statement
- a `print` statement
