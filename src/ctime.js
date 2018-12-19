const
    secondUnit = ['second', 'seconds', 's'],
    minuteUnit = ['minute', 'minutes', 'm'],
    hourUnit = ['hour', 'hours', 'h'],
    dayUnit = ['day', 'days'],
    monthUnit = ['month', 'months'],
    yearUnit = ['year', 'years'];

/**
 * Converts a utc datetime string | unix-timestamp(+ms) to a date object.
 * @param {string|number|date} utc date time string, unix-timestamp, native date object
 * @returns {object} date instance
 */
export function date(val) {
    let date;
    const isObj = typeof val === 'object';

    if (isObj && val.getDate) // date instance
        return val;
    else if (isObj && val._t) // ctime instance
        return new Date(val._t);

    if (typeof val === 'number') { // propably unix-timestamp
        // return new Date(val);
        const isUnix = val % 1 === 0 && (val+'').length <= 10; // old unix timestamp
        // console.log('timestsamp', isUnix, val)
        return new Date(isUnix ? val * 1e3 : val);
    }

    //FIXME: 2018-03-05T02:08:00+0100 leads to a params shift because of the missing ms
    if (typeof val === 'string') { // UTC datetime string parsing
        const d = val.split(/[^0-9]/);
        date = new Date(
            d[0], //year
            d[1] - 1, // month (0-index shift for month)
            d[2], // day
            d[3], // hour
            d[4], // minute
            d[5], // second
        );

        // ms
        d[6] && date.setMilliseconds(d[6]);
        // if UTC offset is defined
        d[7] && date.setUTCHours(parseInt(d[7]) / 100);
    } else { // simple now-timestamp implementation (according local time)
        date = new Date();
    }

    return date;
}

/**
 * Resets our cTime to the beginning of a given unit
 * @param {string} unitString to be set, unix-timestamp, native date object
 * @returns {object} date instance
 */
export function startOf(t, unit) {
    const d = date(t);
    switch (unit) {
        case 'year':
            d.setMonth(0);
        case 'month':
            d.setDate(1);
        case 'midnight':
        case 'day':
            d.setHours(0);
        case 'hour':
            d.setMinutes(0);
        case 'minute':
            d.setSeconds(0);
        case 'second':
            d.setMilliseconds(0);
        default:
    }

    return d.getTime();
}

/**
 * Converts a utc datetime string | date object to a unix-timestamp. Milliseconds 
 * accuracy can be disabled with the ms flag.
 * @param {string|number|date} utc date time string, unix-timestamp, native date object
 * @returns {number} seconds since 1970
 */
export function time(val, unix=false) {
    const t = date(val).getTime();
    return unix ? ~~(t / 1e3) : t;
}

export function set(t, val, unit, rel=false) {
    const d = date(t);

    if (!unit)
        throw new Error('unit parameters must be specified to manipulate date')

    // probably better to init a new instance with new Date(Date.UTC(year, month, ...))
    // for size sake

    // its save to shift units ms - hours by timestamp
    // ex. new Date(1543787732412 + (60 * 60 * 1000 * (24 * 120)))
    // that would be another thing to optimize

    if (unit === 'ms')
        d.setMilliseconds(val + (rel ? d.getMilliseconds() : 0));
    if (secondUnit.indexOf(unit) > -1)
        d.setSeconds(val + (rel ? d.getSeconds() : 0));
    if (minuteUnit.indexOf(unit) > -1)
        d.setMinutes(val + (rel ? d.getMinutes() : 0));
    if (hourUnit.indexOf(unit) > -1)
        d.setHours(val + (rel ? d.getHours() : 0));
    if (dayUnit.indexOf(unit) > -1)
        d.setDate(val + (rel ? d.getDate() : 0));
    if (monthUnit.indexOf(unit) > -1) {
        const m = d.getMonth();
        d.setMonth(rel ? m + val : (val - 1)); // 0-index shift
    }
    if (yearUnit.indexOf(unit) > -1)
        d.setYear(val + (rel ? d.getFullYear() : 0));

    return d.getTime();
}

export function subtract(t, val, unit) {
    const _v = parseInt(val, 10);
    return set(t, _v > 0 ? _v * -1 : _v , unit, /*rel*/true);
}

export function add(t, val, unit) {
    return set(t, parseInt(val, 10), unit, /*rel*/true);
}

/**
 * Diffs two dateish input values
 * @param {string|number|date} utc date time string, unix-timestamp, native date object
 * @returns {number} difference in seconds
 */
export function diff(t1, t2) {
    return Math.abs(Math.round((time(t2) - time(t1)) / 1e3));
}

export function format(val, formatCb) {
    const d = date(val);

    return formatCb({
        utc: d.toISOString(),
        tz: d.getTimezoneOffset(),
        year: d.getFullYear(),
        month: d.getMonth() + 1, // 0-index shift
        day: d.getDate(), 
        hour: d.getHours(), 
        minute: d.getMinutes(), 
        seconds: d.getSeconds(), 
        ms: d.getMilliseconds()
    });
}

function afunc (f, api, assignTime=true, close=false) {
    return function(...args) {
        const r = f.apply(null, [api._t].concat(args));

        if (assignTime)
            api._t = r;

        if (close)
            return assignTime ? api._t : r;

        return api;
    };
}

const ctime = (t, f) => {
    const api = {_t: time(t), _f: null}; // chain ref

    if (f)
        api._f = () => format(api._t, f);

    api.set = afunc(set, api);
    api.add = afunc(add, api);
    api.subtract = afunc(subtract, api);
    api.startOf = afunc(startOf, api, /*assignTime*/true);
    api.diff = afunc(diff, api, /*assignTime*/false, /*close*/true);
    api.time = afunc(time, api, /*assignTime*/true, /*close*/true);
    api.format = afunc(format, api,/*assignTime*/false, /*close*/true);
    api.toString = () => api._f && api._f() || format(api._t, (_time) => _time.utc);

    return api;
}

export default ctime;
