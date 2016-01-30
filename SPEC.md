```
Set my-variable to "Hello!".
```

Sets `my-variable` to `Hello!`. You can then show this variable by:

```
Show my-variable.
```

Shows `my-variable` in a popup box - in this case, it'll show `Hello!`.

```
Ask "What should X be?" for x.
```

Shows a popup question box with `"What should X be?"`. Whatever you type will then be put into the `x` variable.

```
(This is a comment)
(I can type whatever I want in here!)
```

This is a comment - they don't do anything, except provide hints for other people who are reading your code.


## Functions

A function is something that you can execute with certain parameters. They're a handy way to reuse your code without writing it out many times.
```
Define say hello with name:
  Show "Hello, " + name + "! How are you doing?".
End.
```
The function above is called 'say hello', and it takes 'name' as a parameter. You can see that it uses the 'name' variable in the code itself.
Write this to use your function:
```
<say hello with "Chris">.
```

This will show `Hello, Chris! How are you doing?`. If you'd like, you can have more than one variable by separating them with commas, like so:

```
Define multiply with x, y:
  Set result to x * y.
  Show "The result is " + result.
End.

<multiply with 5, 10>
```
This'll show: `The result is 50.`

Sometimes, you don't want your function to show something directly: you can instead have it return a variable, like this:

```
Define devide with x, y:
  Set result to x / y.
  Return result.
End.

Set tenDevidedByFive to <devide with 10, 5>.

Show tenDevidedByFive.
```

If you followed along, you should see that it'll show `2`.

## Conditionals

A conditional is a option that your program can take: if something is that, then do this thing.

```
Set numberOfApples to 5.

If numberOfApples is equal to 5, then do:
    Show "That's a lot of apples.".
End.
```

You can use `is`, `is not` for checking if two variables are equal.
And `<` and `>`, for checking if a variable is less than or greater than another variable.
Finally, you can also use `and`, `or`, to only do something if two or more conditions are true.

```
Set numberOfApples to 5.

If numberOfApples < 7 and numberOfApples > 4, then do:
    Show "You have between 4 and 7 apples. Perfect!".
End.
```

You can also use `Or` statements, like this:
```
If a is 5, then do:
  (A is 5)
  Show "A is 5".
Or if a is 4, then do:
  (A is not 5, but it is 4)
  Show "A is 4".
Or else do:
  (A is not 5, and A is not 4)
  Show "A is not 5 or 4".
End.
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

### For Loop

```
Set a to [5, 10, 15].

For every item in a do:
  Show item.
End.
```

The `For` loop iterates over every item in a list in order.

