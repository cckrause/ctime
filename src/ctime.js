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
export function date(val, legacyUnixTimestamp = false) {
    let date;
    const isObj = typeof val === 'object';

    if (isObj && val.getDate) // date instance
        return val;
    else if (isObj && val._t) // ctime instance
        return new Date(val._t);

    if (typeof val === 'number') { // expecting a unix-timestamp including ms (also supports legacy unix timestamps)
        return new Date(legacyUnixTimestamp ? val * 1e3 : val);
    }

    if (typeof val === 'string') { // native date string parsing
        date = new Date(val);
    } else { // simple now-timestamp implementation (according local time)
        date = new Date();
    }

    return date;
}

export function timeBoundaryShift(t, unit, start=true) {
    const d = date(t);

    const hourBoundary = start ? 0 : 23;
    const timeBoundary = start ? 0 : 59;

    switch (unit) { // @FIXME unit should consitent to other functions, add unit-tests
        case 'year':
            d.setMonth(start ? 0 : 11);
        case 'month':
            d.setDate(start ? 1 : 0);
        case 'midnight':
        case 'day':
            d.setHours(hourBoundary);
        case 'hour':
            d.setMinutes(timeBoundary);
        case 'minute':
            d.setSeconds(timeBoundary);
        case 'second':
            d.setMilliseconds(start ? 0 : 999);
        default:
    }

    return d.getTime();
}

/**
 * Resets given time to the beginning of a given unit
 * @param {string} unitString to be set, unix-timestamp, native date object
 * @returns {object} date instance
 */
export function startOf(t, unit) {
    return timeBoundaryShift(t, unit);
}

/**
 * Resets given time to the end of a given unit
 * @param {string} unitString to be set, unix-timestamp, native date object
 * @returns {object} date instance
 */
export function endOf(t, unit) {
    return timeBoundaryShift(t, unit, /*start*/false);
}

/**
 * Converts a utc datetime string | date object to a unix-timestamp. Milliseconds 
 * accuracy can be disabled with the ms flag.
 * @param {string|number|date} val utc date time string, unix-timestamp, native date object
 * @param {boolean} toLegacyUnixTimestamp converts to legacy unix timestamp
 * @param {boolean} fromLegacyUnixTimestamp allows using legacy unix timestamp
 * @returns {number} seconds since 1970
 */
export function time(val, toLegacyUnixTimestamp=false, fromLegacyUnixTimestamp=false) {
    const t = date(val, fromLegacyUnixTimestamp).getTime();
    return toLegacyUnixTimestamp ? ~~(t / 1e3) : t;
}

export function unix(val) {
    return time(val, true);
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

export function get(t, unit) {
    const d = date(t);
    let rVal;

    if (!unit)
        throw new Error('unit parameters must be specified to manipulate date');

    if (unit === 'ms')
        rVal = d.getMilliseconds();

    if (~secondUnit.indexOf(unit))
        rVal = d.getSeconds();

    if (~minuteUnit.indexOf(unit))
        rVal = d.getMinutes();

    if (~hourUnit.indexOf(unit))
        rVal = d.getHours();

    if (~dayUnit.indexOf(unit))
        rVal = d.getDate();

    if (~monthUnit.indexOf(unit))
        rVal = d.getMonth() + 1;

    return rVal;
}

export function subtract(t, val, unit) {
    const _v = parseInt(val, 10);
    return set(t, _v > 0 ? _v * -1 : _v , unit, /*rel*/true);
}

export function add(t, val, unit) {
    return set(t, parseInt(val, 10), unit, /*rel*/true);
}

/**
 * Diffs two dates
 * WARNING: This function is only working with modern timestamp+ms. to make it work with 
 * legacy unix timestamps wrap ctime() around each parameter which by default is 
 * initializing with legacy timestamps. 
 * (this is indented behaviour for backwards compability)
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
        wday: d.getDay(),
        hour: d.getHours(), 
        minute: d.getMinutes(), 
        second: d.getSeconds(), 
        ms: d.getMilliseconds()
    });
}

function afunc (f, api, assignTime=true, close=false) {
    return function(...args) {
        const t = f.apply(null, [api._t].concat(args)); // call api always with timestmap as first arg
        const immutableApi = ctime((assignTime ? t : api._t), api._f);

        if (close)
            return t;

        return immutableApi;
    };
}


/**
 * Initialize a ctime date
 * @param {string|date}  timeReference
 * @param {function|boolean} modifier formatter function or unix legacy timestamp toggle (default: true)
 * @returns {number}
 */
const ctime = (timeReference, modifier = true) => { // this modifier api design was probably a bad idea (first param should only have one purpose)
    if (timeReference === null) {
        timeReference = undefined;
    }

    const api = {_t: time(timeReference, false, typeof modifier === 'boolean' ? modifier : undefined), _f: null}; // chain ref

    if (modifier && typeof modifier === 'function') {
        api._f = () => format(api._t, modifier);
    }

    api.set = afunc(set, api);
    api.get = afunc(get, api, /*assignTime*/false, /*close*/true);
    api.add = afunc(add, api);
    api.subtract = afunc(subtract, api);
    api.startOf = afunc(startOf, api);
    api.endOf = afunc(endOf, api);
    api.diff = afunc(diff, api, /*assignTime*/false, /*close*/true);
    api.time = afunc(time, api, /*assignTime*/true, /*close*/true);
    api.unix = afunc(unix, api, /*assignTime*/true, /*close*/true);
    api.format = afunc(format, api,/*assignTime*/false, /*close*/true);
    api.toString = () => api._f && api._f() || format(api._t, (_time) => _time.utc);

    return api;
}

export default ctime;

if ('undefined' != typeof module) { module.exports ? module.exports = ctime : undefined; } else {self.ctime = ctime;}