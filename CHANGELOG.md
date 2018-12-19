### [0.3.0] NEXT
#### Features
- `startOf`: implements function to reset date to a specific timeunit
### [0.2.0] 2018-12-03
#### Fixes
- `date`: caused init new now timestamp in case passing in a ctime date object
- `format`: day param was a weekday number not a month day number

#### Features
- diff(<string|object|number>time1, <string|object|number>time2)

### [0.1.0] 2018-12-03
initial version comes with of a pure functional solution and a fluent interface (mutable data right now :().

#### fluent interface
- ctime
    - time
    - set
    - add
    - subtract
    - format


#### functional interface
- date
- time
- set
- add
- subtract
- format
