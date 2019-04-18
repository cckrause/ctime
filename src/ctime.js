const
    secondUnit = ['second', 'seconds', 's'],
    minuteUnit = ['minute', 'minutes', 'm'],
    hourUnit = ['hour', 'hours', 'h'],
    dayUnit = ['day', 'days'],
    monthUnit = ['month', 'months'],
    yearUnit = ['year', 'years'];

// match time part of UTC strings in various expressions <HH:mm:ss>|<HH:mm:ssZ>
const tRegex = /(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?/;

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

    if (typeof val === 'string') { // UTC datetime string parsing
        date = parseDateTimeString(val);

    } else { // simple now-timestamp implementation (according local time)
        date = new Date();
    }

    return date;
}

export function parseDateTimeString(val) {
    let date;
    const d = val.split(/[^0-9]/);
    const tm = val.match(tRegex);
    // tm[1]; // h
    // tm[2]; // m
    // tm[3]; // s
    // tm[4]; // ms
    // tm[5]; // tz

    let tz = undefined;

    if (tm[5]) // set Zulu tz (UTC-0) in case z is present in string
        tz = tm[5].toLowerCase() === 'z' ? 0 : (tm[5].replace(':', '') / 100);

    date = new Date(Date.UTC(
        d[0], //year
        d[1] - 1, // month (0-index shift for month)
        d[2], // day
        tz !== undefined ? (tm[1] - tz) : 0, // hour with tz offset
        tm[2] || 0, // minute
        tm[3] || 0, // second
        tm[4] && tm[4].replace('.', '') || 0
    ));
    
    if (tz === undefined) { // fallback to local time if no utc tz is defined
        date.setHours(tm[1]);
        date.setDate(d[2]);
    }

    return date;
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
        const t = f.apply(null, [api._t].concat(args));
        const immutableApi = ctime((assignTime ? t : api._t), api._f);

        if (close)
            return t;

        return immutableApi;
    };
}

const ctime = (t, f) => {
    const api = {_t: time(t), _f: null}; // chain ref

    if (f)
        api._f = () => format(api._t, f);

    api.set = afunc(set, api);
    api.add = afunc(add, api);
    api.subtract = afunc(subtract, api);
    api.diff = afunc(diff, api, /*assignTime*/false, /*close*/true);
    api.time = afunc(time, api, /*assignTime*/true, /*close*/true);
    api.format = afunc(format, api,/*assignTime*/false, /*close*/true);
    api.toString = () => api._f && api._f() || format(api._t, (_time) => _time.utc);

    return api;
}

export default ctime;
