import {format, date} from 'ctime';
import {expectedDate} from './utils';


const formatTests = [
    [
        '2018-12-02T17:22:40.000Z', // 0 utc iso string
        0, // 1 tz offset
        2018, // 2 year
        12, // 3 month
        2, // 4 day
        17, // 5 hour
        22, // 6 min
        40, // 7 sec
        0, // 8 ms

    ]
];

describe('format', () => {
    for (const test of formatTests) {
        it(`should return all relevant date informations for given date ${test[0]}`, () => {
            format(test[0], (d) => {
                const _expectedDate = expectedDate(test[2], test[3], test[4], test[5], test[6], test[7], test[8], test[1]);

                expect(d.utc).toEqual(test[0]); // ctime should always return the correct UTC time
                // as ctime is using relative system tz we test for that
                expect(d.tz).toEqual(_expectedDate.getTimezoneOffset());
                expect(d.year).toEqual(_expectedDate.getFullYear());
                expect(d.month).toEqual(_expectedDate.getMonth() + 1);
                expect(d.day).toEqual(_expectedDate.getDate());
                expect(d.hour).toEqual(_expectedDate.getHours());
                expect(d.minute).toEqual(test[6]);
                expect(d.second).toEqual(test[7]);
                expect(d.ms).toEqual(test[8]);

            });
        });
    }
});