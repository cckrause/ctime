# ctime [![Build Status](https://travis-ci.org/cckrause/ctime.svg?branch=master)](https://travis-ci.org/cckrause/ctime)

[![ctimejs](https://saucelabs.com/browser-matrix/cckrause.svg)](https://saucelabs.com/u/cckrause)

A light library that provides a minimal function set to manipulate dates and timestamps in Javascript.

<!-- * 133bytes (ES6 function set) 🤩 -->
* [![gzip size](http://img.badgesize.io/https://unpkg.com/ctimejs/dist/ctime.min.js?compression=gzip)](https://unpkg.com/ctimejs/dist/ctime.min.js)
* unix-timestamp ✅
* unix-timestamp+ms ✅
* fluent interface ✅
* immutable ✅

## Install via npm

```
$ npm install ctimejs
```

## API

```js
ctime().add(30, 'days').subtract(1, 'year').format((time) => time.utc)
```

- ctime
    - time ✅
    - set ✅
    - add ✅
    - subtract ✅
    - diff ✅
    - format ✅
    - startOf 🔜
    - endOf 🔜

## Supported ISO8601 Formats

```
2008-08-30T01:45:36
2018-03-05T01:45:36Z
2018-03-05T01:45:36.999
2018-03-05T01:45:36.999Z
2018-03-05T01:45:36.999+0100
2018-03-05T01:45:36.999+07:00
2018-03-05T03:08:02.177+0100
```


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
