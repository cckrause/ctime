# ctime

A light library that provides a minimal function set to manipulate dates and timestamps in Javascript.

<!-- * 133bytes (ES6 function set) 🤩 -->
* 986bytes (ctime fluent interface) ✅
* unix-timestamp and unix-timestamp+ms support ✅
* fluent interface ✅
<!-- * immutable (ctime fluent interface is not right now)  -->

## Install via NPM

```
$ npm install ctimejs
```

## API

```js
ctime().add(30, 'days').subtract(1, 'year').format((time) => time.utc)
```

- ctime
    - time
    - set
    - add
    - subtract
    - diff
    - format

<!-- ## ES6 Module

- date
- time
- set
- add
- subtract
- format

```js
import {date, time, format} from 'ctime';

// now time
time() // 1543826404199 (2018-12-03T08:40:04.199Z)

// init with unix
date(534236400) // native date object

// init with unix+ms
date(534236400000) // native date object

// Man takes first steps on the Moon
format(-14159040, (date) => date.utc) // "1969-07-21T02:56:00.000Z"
``` -->

## ctime?
The name was inspired by the C Programming Language function [`ctime`](https://en.wikipedia.org/wiki/C_date_and_time_functions "Wikipedia C Date and Time Functions"). C code is known for being fast and efficient but also for its dangerous sides, which suits the handling of date objects in JS in my opinion.

made with 💙 in cologne.
