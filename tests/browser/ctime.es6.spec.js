
import {time, subtract, set} from 'ctime';
import {expectedDateAsUnix, expectedDate} from './utils';

describe('ctime (functional)', () => {
    it('time: timestamp', () => {
        const nowt = time();
        const expected = (new Date()).getTime();

        expect(nowt).to.equal(expected);
    });

    it('set year (unit:year) (Dec 3th 2018) to (Dec 3th 1986)', () => {
        // 1543826404199 = 2018-12-03T08:40:04.199Z
        let ts = 1543826404199;
        ts = set(ts, 1986, 'year');

        const expected = expectedDateAsUnix(
            /*year*/1986, 
            /*month*/12, 
            /*day*/3, 
            /*hour*/9, 
            /*minute*/40, 
            /*second*/4, 
            /*ms*/199, 
            /*utcOffset*/1);

        expect(ts).to.equal(expected);
    });

    // FIXME: add all set tests
});