---
date: February 14 2020
---

# Learning Rust

I've been learning Rust and want to share some notes on my discoveries.


## Syntax complexity
_February 14, 2020_

I've complained in the past about complexity in languages. I think Go is big on being a concise language with preferrably one way to do things.  Rust, so far, has been pretty good at this. But I ran into this case about automatic return values:

```rust
fn foo() {
    x + 1
}
```

In Rust if the final line of a function is an expression, the function will return the result of that expression. `x + 1`  is the same as `return x + 1;`.  It's a bit surprising that Rust would have "for the sake of conciseness" syntax like this.

My guess is that without it, some syntax will get _really_ messy.  Probably when defining arms of a `match` statement and such.

This is a lot like JavaScript's arrow function. Makes sense to have an implicit return for small lamba-like functions. But if you use an arrow function for something much larger, the lack of an explicit `return` can be quite confusing to read.

I think I'm going to get into the habit of explicitly returning values for non-trivial function definitions. Unless rustfmt yells at me or I learn more and "see the light" on this feature.


## A Followup on Syntax complexity.
_February 21, 2020_

I had the "see the light" moment. A colleague pointed me to a reference on this: https://users.rust-lang.org/t/explicit-and-implicit-return-in-functions/17089/4

Steve Klabnik (who has been very helpful, directly responding to my questions on Hacker News too!):  "“Implicit return” gives you the wrong mental model. It’s not an implicit return. It’s that Rust is an expression-based language. As an expression-based languages, most things are expressions, and expressions evaluate to a value. Blocks are expressions, and so the final value of a block is that block’s value. Functions are blocks."

And that makes it very clear to me. We're not just being lazy with syntax. We need to consider that lots of things in rust are expressions. As Steve points out, functions are blocks. So while they have a side effect, they also produce a value (expressions vs. statements).

This is why ternary operator doesn't need to exist. The if/else can just be used as one:

```rust
let x = if (true) {5} else {7};
```


## A followup
_July 2020_

Spent a lot of time with rust writing a Chip8 emulator and half of a Game Boy emulator (so far). It's an incredibly powerful language. I need to write about it more.
