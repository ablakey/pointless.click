# JavaScript Promises


Promises are not async by default. Their executor function is invoked immediately. If it's a sync function, the promise gets fulfilled immediately.

```javascript
async function asyncFn() {
    console.log(2);
    return 2;
}

function promiseFn() {
    console.log(3);
    return new Promise(res => res(3));
}

const promise1 = new Promise(resolve => {
    console.log(1)
    resolve(1);
});

const promise2 = asyncFn();
const promise3 = promiseFn();

console.log(4);

const results = Promise.all(promise1, promise2, promise3);

console.log(5);
```

Promises will resolve when they resolve if there's a mechanism in them causing work on the queue or I/O to call the resolve function later. Note that without wrapping in an async function, the process would exit before the queue is empty. That is, calling `promiseTask()` put a task on the queue via `setTimeout` but the main script gets to the end (emptying the stack) and exits. They key
is that the main function does not progress until all promises are resolved (via `await`).

```javascript
async function asyncFn() {
    console.log(1);
    return;
}

function promiseTask() {
    return new Promise(resolve => {
        console.log(2);
        setTimeout(() => {
            console.log(4);
            resolve();
        }, 0)
    });
}


async function main() {
    const promise1 = asyncFn();
    const promise2 = promiseTask();

    console.log(3);

    const results = await Promise.all([promise1, promise2]);

    console.log(5);
}

main();
```
