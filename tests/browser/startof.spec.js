import ctime from 'ctime';
import {expectedDateAsUTCString, expectedDate} from './utils';

const timeUnits = {
    'second': expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/2, /*minute*/8, /*second*/2, /*ms*/0, /*utcOffset*/1),
    'minute': expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/0, /*utcOffset*/1),
    'hour': expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/2, /*minute*/0, /*second*/0, /*ms*/0, /*utcOffset*/1),
    // 'day': expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/0, /*minute*/0, /*second*/0, /*ms*/0, /*utcOffset*/1),
    // 'month': expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/1, /*hour*/0, /*minute*/0, /*second*/0, /*ms*/0, /*utcOffset*/1),
    // 'year': expectedDateAsUTCString(/*year*/2018, /*month*/1, /*day*/1, /*hour*/0, /*minute*/0, /*second*/0, /*ms*/0, /*utcOffset*/1)
};

describe('startOf (fluent interface)', () => {
    for (const key in timeUnits) {
        if (timeUnits.hasOwnProperty(key)) {
            it(`should reset cTime to the beginning of current ${key}`, () => {
                const expected = timeUnits[key];
                const ct = ctime('2018-03-05T02:08:02.177+0100')
                    .startOf(key);
                expect(ct.toString()).to.equal(expected);
            });
        }
    }
});
