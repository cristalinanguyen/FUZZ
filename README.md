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

### Beginning a Program
All programs in the language FUZZ++ begin with `yoo!`. 

### Data Types
- boolean: `cozy` and `not_cozy`
- string: `"my UGGs are soooo comfortable"`
- numbers: `1`, `100`, `420`,`1.5`, `3.14`, `70.34799`
- array: `[5, 6, 7, 8, 9, 10]`, `["compilers", "operating systems", "interaction design", "plang", "theory"]`
- dictionary: Dict<str> fuzzies = {chris: "domed", liam: "caffinated", meels: "dank gardens", annie: "late and wet", sophia: "went abroad"}

### Variable Declarations
Every new variable is declared using the keyword `fuzz` followed by its identifier.
```
fuzz str annies_coffee_cart_order = "iced chai with almond milk and a shot"
fuzz num num_of_juuls_chris_has_lost = 27
fuzz str meels_favorite_snack = "hot cheetos"
fuzz bool dondi_wears_airpods = cozy
```

### Function Declarations

The tilde (~) is used to enclose method bodies, as well as group statements in 'iph' statements and 'while' loops.

```
function bool dondi_wearing_airpods()
  returnt cozy
~

function str bjohnson()
  returnt "squirrel!"
~

function num mins_forney_spends_erasing(num classes)
  fuzz time = 8 * classes
  returnt time
~  

function bool toal_playing_vball(bool weather)
  iph (weather)
    returnt cozy
  ~    
  elz 
    returnt not_cozy
  ~
~

function str dorin()
  returnt "among friends"
~
```

### `iph` Statements
An `iph` statement executes the following block of code, if the specified condition is true. Iph statements can be followed by 0 or more `elz iph` statements and an optional `elz` statement which execute when the condition is false. Iph statements are closed using a tilde (~).

```
iph weather == 1
  fuzzies_wearing_jackets = cozy
~ 
elz iph weather == 0
  fuzzies_wearing_jackets = not_cozy
~
elz
  return "I dont know what the fuzzies are wearing today."
~

```

### Comments
```
heres the thing: the Keckmas party was banging !!

```

### Arithmetic
```
fuzz num sum = 2 + 4
fuzz num difference = 4 - 2
fuzz num product = 2 * 4
fuzz num quotient = 4 / 2
fuzz num exponent = 2 ** 4
```

### Data Structures
#### Arrays
An array is an ordered sequence of elements of the same type.
```
fuzz Arr<str> im_hungry = ["spicy tuna roll", "california roll", "salmon sashimi", "miso soup"]
```

#### Dictionaries
A dictionary stores pairs of elements as keys and values. All keys must be of the same type and all values must be of the same type.
```
fuzz Dict<valueType> example = {key: value};
fuzz Dict<num> vegan_food_prices = {vegan_burger: 5.50, vegan_chips: 2.99, vegan_romaine_lettuce: 4.00}
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
