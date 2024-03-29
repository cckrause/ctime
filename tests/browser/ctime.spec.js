
import ctime, {time, subtract} from 'ctime';
import {expectedDateAsUTCString, expectedDate} from './utils';

describe('ctime', () => {
    it('fluent interface ', () => {
        const ct = ctime();
        expect(typeof ct.time).toEqual('function');
        expect(typeof ct.add).toEqual('function');
        expect(typeof ct.subtract).toEqual('function');
        expect(typeof ct.format).toEqual('function');
        expect(typeof ct.set).toEqual('function');
    });

    it('init with unix-timestamp', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/2, /*hour*/17, /*minute*/22, /*second*/40, /*ms*/0, /*utcOffset*/1);
        expect(ctime(1543767760).toString()).toEqual(expected);
    });

    it('init with unix-timestamp (+ms) (disable legacy unix timestamp flag needs to be applied)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/2, /*hour*/17, /*minute*/22, /*second*/40, /*ms*/0, /*utcOffset*/1);
        expect(ctime(1543767760000, false).toString()).toEqual(expected);
    });

    it('init with unix timestamp (before 1970-01-01T00:00:00): The dropping of the first Atomic bomb on Hiroshima Japan', () => {
        // '1945-08-05T23:15:00.000Z'
        const expected = expectedDateAsUTCString(/*year*/1945, /*month*/8, /*day*/5, /*hour*/23, /*minute*/15, /*second*/0, /*ms*/0, /*utcOffset*/0);

        expect(ctime(-770172300).toString()).toEqual(expected);
    });

    it('init with `date` instance', () => {
        const givenDate = new Date('1970-3-3');
        givenDate.setUTCDate(3); // TZ safety
        givenDate.setUTCHours(0, 0, 0); // TZ safety
        const expected = expectedDateAsUTCString(/*year*/1970, /*month*/3, /*day*/3, /*hour*/0, /*minute*/0, /*second*/0, /*ms*/0, /*utcOffset*/0);

        expect(ctime(givenDate).toString()).toEqual(expected);
    });
});