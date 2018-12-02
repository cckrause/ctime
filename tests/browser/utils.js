export function clamp(value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

export function tclamp(value, min, max) {
    return clamp(value, 0, 59);
}

export function expectedDate(year, month, day, hours, minutes, seconds, ms, utcOffset, ts=false, utcString=false) {
    const d = new Date(Date.UTC(
        year || 0, 
        clamp(month - 1, 0, 11) || 0,  // 0-index shift
        clamp(day, 1, 31)  || 0,
        hours - utcOffset,
        tclamp(minutes) || 0,
        tclamp(seconds) || 0,
        clamp(ms, 0, 999) || 0
    ));


    if (ts)
        return d.getTime();
    if (utcString)
        return d.toISOString();

    return d
}

export function expectedDateAsUnix(...args) {
    return expectedDate.apply(null, args.concat([/*as timestamp*/ true]));
}

export function expectedDateAsUTCString(...args) {
    return expectedDate.apply(null, args.concat([/*as timestamp*/ false, true]));
}

const
    defaultc  = 49,
    magenta = 35,
    red = 31,
    green = 32,
    blue = 34,
    cyan = 36;

function colorize(text, color) {
    return `\x1b[${color || defaultc}m${text}\x1b[0m`;
}

function cfunc(text) {
    return colorize(text, cyan);
}

function cinput(text) {
    return colorize(text, blue);
}

function coutput(text) {
    return colorize(text, green);
}

function IOTest(input, expected, cb, func = '', label) {
    const _func = func ? colorize(func, magenta) + ': ' : '';
    const _label = label && colorize(label, cyan) || '';
    it(`input ${cinput(i)} should return ${coutput(o)}`, () => {
        expect(cb(input)).toBe(tsWitoutMsAccuracy(new Date(expected)));
    });
}