
import ctime, {time, subtract} from 'ctime';
import {expectedDateAsUTCString, expectedDate} from './utils';

describe('ctime', () => {
    it('fluent interface ', () => {
        const ct = ctime();
        expect(ct.time).to.be.a('function');
        expect(ct.add).to.be.a('function');
        expect(ct.subtract).to.be.a('function');
        expect(ct.format).to.be.a('function');
        expect(ct.set).to.be.a('function');
    });

    // TODO: implement more input formats

    // NOT SUPPORTED: 2018-03-05T02:08:00+0100 (missing ms part)
    xit('FIXME: init with UTC string: `2018-03-05T02:08:00+0100`', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/177, /*utcOffset*/1);
        expect(ctime('2018-03-05T02:08:00+0100').toString()).to.equal(expected);
    });

    it('init with UTC string: `2018-03-05T02:08:00.177+0100`', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/177, /*utcOffset*/1);
        expect(ctime('2018-03-05T02:08:00.177+0100').toString()).to.equal(expected);
    });

    it('init with UTC string: `2018-03-05T02:08:00.0+0100`', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/2, /*minute*/8, /*second*/0, /*ms*/0, /*utcOffset*/1);
        expect(ctime('2018-03-05T02:08:00.0+0100').toString()).to.equal(expected);
    });

    it('init with unix-timestamp', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/2, /*hour*/17, /*minute*/22, /*second*/40, /*ms*/0, /*utcOffset*/1);
        expect(ctime(1543767760).toString()).to.equal(expected);
    });

    it('init with unix-timestamp (+ms)', () => {
        const expected = expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/2, /*hour*/17, /*minute*/22, /*second*/40, /*ms*/0, /*utcOffset*/1);
        expect(ctime(1543767760000).toString()).to.equal(expected);
    });

    it('init with unix timestamp (before 1970-01-01T00:00:00): The dropping of the first Atomic bomb on Hiroshima Japan', () => {
        // '1945-08-05T23:15:00.000Z'
        const expected = expectedDateAsUTCString(/*year*/1945, /*month*/8, /*day*/5, /*hour*/23, /*minute*/15, /*second*/0, /*ms*/0, /*utcOffset*/0);

        expect(ctime(-770172300).toString()).to.equal(expected);
    });
});