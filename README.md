# ctime

A light library that provides a minimal function set to manipulate dates in Javascript.

* 977bytes ✅
* unix-timestamp and unix-timestamp+ms support ✅
* fluent interface ✅
* immutable ❌ 

## Usage

```js
ctime().add(30, 'days').subtract(1, 'year').format((time) => time.utc)
```

## ctime?
The name was inspired by the C Programming Language function `ctime` https://en.wikipedia.org/wiki/C_date_and_time_functions. C code is known for for being fast and efficient but also for its dangerous sides, which suits the handling of date objects in JS in my opinion.

made with 💙 in cologne!
