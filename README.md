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
- Phor (for) Loops, While Loops

## Examples

### Data Types
- boolean: `cozy` and `not_cozy`
- string: `"my UGGs are soooo comfortable"`
- integer: `1`, `100`, `420`
- float: `1.5`, `3.14`, `70.34799`
- None: `None`
- list: `[5, 6, 7, 8, 9, 10]`, `[["compilers", "operating systems"], ["interaction design", "plang", "theory"]]`
- dictionary: `{"UGGs": cozy, "jackets": cozy, "FUZZ++"": cozy, "lair food": not_cozy}`
- set: `{1, 2, 95, 7}`

@group: we could also make float and int the same data type (number) and get rid of the last 3 types bc it might be too hard to do lol

### Variable Declarations
Every new variable is declared using the keyword `fuzz` followed by its identifier.
```
fuzz annies_coffee_cart_order = "iced chai with almond milk and a shot"!
fuzz num_of_juuls_chris_has_lost = 27!
fuzz meels_favorite_snack = "hot cheetos"!
fuzz dondi_wears_airpods = cozy!
```
Notice that every line ends in an exclamation mark, `!`, and that is because cozy coding is just so much fun!

### Function Declarations

The tilde (~) is used to enclose method bodies, as well as group statements in 'iph' statements and 'phor' loops.

```
function dondi_wearing_airpods()~
  returnt cozy!
~

function bjohnson()~
  returnt "squirrel!"!
~

function mins_forney_spends_erasing(int classes)~
  fuzz time = 8 * classes!
  returnt time!
~

function toal_playing_vball(boolean weather)~
  iph (weather)~
    returnt cozy!
  ~ elz ~
    returnt not_cozy!
  ~
~

function dorin()~
  returnt "among friends"!
~
```

### `iph` Statements
An `iph` statement executes the block of code inside the tildes `~`, if the specified condition is true. Iph statements can be followed by 0 or more `if elz` statements and an optional `elz` statement which execute when the condition is false

```
iph (weather == 1)~
  fuzzies_wearing_jackets = cozy!
~ elz iph (weather == 0)~
  fuzzies_wearing_jackets = not_cozy!
~ elz ~
  return "I dont know what the fuzzies are wearing today."!
~
```

### `phor` Statements
A `phor` statement executes the block of code inside the tildes `~` the number of times specified in the parentheses
```
phor (fuzz i = 0; i < 100; i++)~
  print "WE LOVE FUZZIES"!
~
```

### Comments
```
yoo! 
yoo! the Keckmas party was banging
yoo!

```

### Arithmetic
```
fuzz sum = 2 + 4!
fuzz difference = 4 - 2!
fuzz product = 2 * 4!
fuzz quotient = 4 / 2!
```

@group should we add mod % ??? bc i feel like that could be lit

### Data Structures
#### Lists
A list is an ordered sequence of elements of the same type.
```
fuzz im_hungry = ['spicy tuna roll', 'california roll', 'salmon sashimi', 'miso soup']!
```

#### Dictionaries
A dictionary stores pairs of elements as keys and values. All keys must be of the same type and all values must be of the same type.
```
fuzz example = {'key': 'value'}!
fuzz vegan_food_prices = {'vegan burger': 5.50, 'vegan chips': 2.99, 'vegan romaine lettuce': 4.00}!
```

#### Sets
A set is an unordered group of unique elements of the same type.
```
fuzz fuzzy_gang_gang = {'phi phi', 'nini', 'meelz', 'lili', 'leanz', 'chrissykins'}!
```

### Expressions
A FUZZ++ expression is one of the following:
- a boolean literal: `cozy` or `not_cozy`
- a numeric literal: `53`, `2.6`
- a string literal, delimited by single or double quotes (`'hi'`, or `"hi"`), containing any character except a newline, backslash, or quotes (these can be escaped as `\n`, `\\`, `\'`, and `\"`)
- a variable reference
- a function call
- an infix expression with any of the following operators: `and`, `or`, `<`, `<=`, `==`, `NOT=`, `>=`, `>`, `+`, `-`, `*`, `/`

### Statements
A FUZZ++ statement is one of the following:
- a variable declaration
- a function declaration
- an assignment statement (such as `a = b`, where `a` and `b` are both previously declared variables)
- a function call
- a `chill` statement (must appear in a loop and tells the program to chill out with that loop, break out of it, and move on to the code after the loop)
- a `returnt` statement (returns a value from a function; it is an error if `returnt` appears somewhere other than in a function body)
- an `iph`, `iph elz`, or `elz` statement
- a `phor` statement
- a `print` statement

@group we need better names for print
