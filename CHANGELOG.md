### NEXT
#### Fixes
- npm security audit, solves a lot of security vulnerabilities in dependencies.

### [0.3.0] 2019-05-21
#### Features
- `startOf`
- `endOf`: implements functions to reset date to a specific time unit.
- `unix`: to get ctime time stamp or now timestamp if called with no params.
- `get`: receive value of specific date time part.

#### Changes
- `format`: callback t object attribute `minutes` was changed to `minute` for consistency reasons.

### [0.3.0]
#### Features
- Immutability
- `parseDateTimeString`: Implements a better parser for ISO8601 standard.

#### Fixes
- `date`: Fixes datetime string parsing. Timezones where twisted with ms in some ISO8601 expressions.

### [0.2.0] 2018-12-03
#### Fixes
- `date`: caused init new now timestamp in case passing in a ctime date object.
- `format`: day param was a weekday number not a month day number.

#### Features
- `diff(<string|object|number>time1, <string|object|number>time2)`

### [0.1.0] 2018-12-03
initial version comes with of a pure functional solution and a fluent interface (mutable data right now :().

- fluent interface
    - time
    - set
    - add
    - startOf
    - subtract
    - format


- functional interface
    - date
    - time
    - set
    - add
    - subtract
    - format
    - startOf
    - endOf
    - unix
