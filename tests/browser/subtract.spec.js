import ctime from 'ctime';
import {expectedDateAsUTCString} from './utils';

describe('subtract (fluent interface)', () => {
    it('subtract days (Mar 5th 2018 - 10days) should shift to (Feb 23th 2018)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/2, /*day*/23, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/177, /*utcOffset*/1);
        const ct = ctime('2018-03-05T02:08:00.177+0100')
                        .subtract(10, 'days');
        expect(ct.toString()).toEqual(expected);
    });
});