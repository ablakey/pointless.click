---
date: February 2020
---

# Learning Rust

I've been learning Rust and want to share some notes on my discoveries.


## Syntax complexity
_February 15, 2020_

I've complained in the past about complexity in languages. I think Go is big on being a concise language with preferrably one way to do things.  Rust, so far, has been pretty good at this. But I ran into this case about automatic return values:

```rust
fn foo() {
    x + 1
}
```

`x + 1`  is the same as `return x + 1;`.  It's a bit surprising that Rust would have "for the sake of conciseness" syntax like this.

My guess is that without it, some syntax will get _really_ messy.  Probably when defining arms of a `match` statement and such.

This is a lot like JavaScript's arrow function. Makes sense to have an implicit return for small lamba-like functions. But if you use an arrow function for something much larger, the lack of an explicit `return` can be quite confusing to read.

I think I'm going to get into the habit of explicitly returning values for non-trivial function definitions. Unless rustfmt yells at me or I learn more and "see the light" on this feature.
