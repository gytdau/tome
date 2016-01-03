# Language specifications

This is a list of the available syntax in Tome. Note that every sentence must start with a capital letter, and end with
a period ( `.` ).

```
Set a as b.
```

Set the variable `a` to the expression `b`

```
Increment a.
```

Increments `a` by 1.

```
Decrement a.
```

Decrements `a` by 1.

```
Add b to a.
```

Increments `a` by the expression `b`

```
Subtract b from a.
```

Decrements `a` by the expression `b`


```
Show a.
```

Shows `a` to the user


```
Ask "What is a?" for a.
```

Asks the user the question `"What is a?"` and puts the user's response into `a`

```
(This is a comment)
```

Code comment. Tome ignores any statements which begin with `(` and end with `)`.


## Conditionals

This is the general pattern for conditionals:
```
If conditional, then do:
    <code>
Or if conditional, then do:
    <code>
Or else do:
    <code>
End.
```


Below, you will find the conversion chart for Tome syntax into normal programming syntax for conditionals.


| Syntax in Tome  | Normal syntax     |
|-----------------|-------------------|
|   is equal to   |         ==        |
| is not equal to |         !=        |
| is greater than |         >         |
|   is less than  |         <         |
|       and       |         &&        |
|        or       |         \|\|        |
|   is inside of  | a.indexOf(b) > -1 |

This is a sample conditional program, to show you the syntax required. Parenthesies are allowed but discouraged.
```
If a is equal to 5, then do:
Show "A is 5".
Or if a is equal to 4, then do:
Show "A is 4".
Or else do:
Show "A is not 5 or 4".
End.

Discouraged syntax:
If (a is equal to 5), then do:

Encouraged syntax:
If a is equal to 5, then do:
```

## Loops

### While Loop


```
While (conditional) do:
    <code>
End.
```

The While loop executes the code forever as long as the conditional still evaluates to True.

### Count Loop

This is a simplified version of the common `for` loop.

```
Count until a reaches 5:
Show a.
End.

Output:
0 1 2 3 4
```

The Count loop also supports negative numbers.

```
Count until a reaches -5:
Show a.
End.

Output:
0 -1 -2 -3 -4
```

The simplicity means that it's also more limited than the standard For loop.
It only supports the variable starting at 0; and incrementing or decrementing by 1 until it reaches the target.
If you want to simulate the capabilities of a standard For loop in Tome, you'll have to use the While loop instead.
