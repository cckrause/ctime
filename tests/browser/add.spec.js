import ctime from 'ctime';
import {expectedDateAsUTCString, expectedDate} from './utils';

describe('add (fluent interface)', () => {
    it('minutes (unit:m) (Dec 31th 02:08:00 + 4min) should shift to (Dec 31th 02:12:00)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/31, /*hour*/2, /*minute*/12, /*second*/0, /*ms*/177, /*utcOffset*/1);
        const ct = ctime('2018-12-31T02:08:00.177+0100')
                        .add(4, 'm');
        expect(ct.toString()).to.equal(expected);
    });

    it('minutes (unit:minute) (Dec 31th 02:08:00 + 4min) should shift to (Dec 31th 02:12:00)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/31, /*hour*/2, /*minute*/12, /*second*/0, /*ms*/177, /*utcOffset*/1);
        const ct = ctime('2018-12-31T02:08:00.177+0100')
                        .add(4, 'minute');
        expect(ct.toString()).to.equal(expected);
    });

    it('minutes (unit:minutes) (Dec 31th 02:08:00 + 4min) should shift to (Dec 31th 02:12:00)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/31, /*hour*/2, /*minute*/12, /*second*/0, /*ms*/177, /*utcOffset*/1);
        const ct = ctime('2018-12-31T02:08:00.177+0100')
                        .add(4, 'minutes');
        expect(ct.toString()).to.equal(expected);
    });

    it('days (unit:day) (Dec 31th 2018 + 10days) should shift to (Jan 10th 2019)', () => {
        const expected = expectedDateAsUTCString(/*year*/2019, /*month*/1, /*day*/10, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/177, /*utcOffset*/1);
        const ct = ctime('2018-12-31T02:08:00.177+0100')
                        .add(10, 'day');
        expect(ct.toString()).to.equal(expected);
    });

    it('days (unit:days) (Dec 31th 2018 + 10days) should shift to (Jan 10th 2019)', () => {
        const expected = expectedDateAsUTCString(/*year*/2019, /*month*/1, /*day*/10, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/177, /*utcOffset*/1);
        const ct = ctime('2018-12-31T02:08:00.177+0100')
                        .add(10, 'days');
        expect(ct.toString()).to.equal(expected);
    });

    // it('add and subtract days (Dec 31th 2018 + 10days - 10days) should shift to (Dec 11th 2018)', () => {
    //     const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/11, /*hour*/2, /*minute*/8, /*second*/0, ms177, /*utcOffset*/1);
    //     const ct = ctime('2018-12-31T02:08:00.177+0100')
    //                     .add(10, 'days')
    //                     .subtract(30, 'days');
    //     expect(ct.toString()).to.equal(expected);
    // });
});
