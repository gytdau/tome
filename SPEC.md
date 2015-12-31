# Language specifications

This is a list of the available syntax in Tome.

```
Set a as b
```

Set the variable `a` to the expression `b`

```
Add b to a
```

Increments `a` by the expression `b`

```
Subtract b from a
```

Decrements `a` by the expression `b`


```
Show a
```

Shows `a` to the user


```
Ask "What is a?" for a
```

Asks the user the question `"What is a?"` and puts the user's response into `a`


## Conditionals

This is the general pattern for conditionals:
```
If conditional:
    <code>
Or if conditional:
    <code>
Or else:
    <code>
End
```


Below, you will find the conversion chart for Tome syntax into normal programming syntax for conditionals.

| Syntax in Tome  | Normal syntax |
|-----------------|---------------|
|   is equal to   |       ==      |
| is not equal to |       !=      |
| is greater than |       >       |
|   is less than  |       <       |
|       and       |       &&      |
|        or       |       \|\|      |

This is a sample conditional program, to show you the syntax required. Parenthesies are allowed but discouraged.
```
If a is equal to 5:
Show "A is 5"
Or if a is equal to 4:
Show "A is 4"
Or else:
Show "A is not 5 or 4"
End
```
```
Discouraged syntax:
If (a is equal to 5):

Encouraged syntax:
If a is equal to 5:
```