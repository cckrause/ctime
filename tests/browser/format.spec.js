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

                expect(d.utc).to.equal(test[0]); // ctime should always return the correct UTC time
                // as ctime is using relative system tz we test for that
                expect(d.tz).to.equal(_expectedDate.getTimezoneOffset());
                expect(d.year).to.equal(_expectedDate.getFullYear());
                expect(d.month).to.equal(_expectedDate.getMonth() + 1);
                expect(d.day).to.equal(_expectedDate.getDate());
                expect(d.hour).to.equal(_expectedDate.getHours());
                expect(d.minute).to.equal(test[6]);
                expect(d.second).to.equal(test[7]);
                expect(d.ms).to.equal(test[8]);

            });
        });
    }
});