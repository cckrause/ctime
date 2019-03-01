### NEXT
#### Features
- `parseDateTimeString`: Implements a better parser for ISO8601 standard

#### Fixes
- `date`: Fixes datetime string parsing. Timezones where twisted with ms in some ISO8601 expressions

### [0.2.0] 2018-12-03
#### Fixes
- `date`: caused init new now timestamp in case passing in a ctime date object
- `format`: day param was a weekday number not a month day number

#### Features
- diff(<string|object|number>time1, <string|object|number>time2)

### [0.1.0] 2018-12-03
initial version comes with of a pure functional solution and a fluent interface (mutable data right now :().

- fluent interface
    - time
    - set
    - add
    - subtract
    - format


- functional interface
    - date
    - time
    - set
    - add
    - subtract
    - format
