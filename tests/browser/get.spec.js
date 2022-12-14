import ctime from 'ctime';

import {expectedDateAsUTCString, expectedDate} from './utils';

describe('get (fluent interface)', () => {
    it('get (unit:minute) (Dec 31th 02:08:00)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/31, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/177, /*utcOffset*/1);

        expect(ctime('2018-12-31T02:08:00.177+0100')
                        .get('m')).toEqual(8);
    });
});
