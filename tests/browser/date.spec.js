import {date} from 'ctime';

const ISO8601 = [
    '2008-08-30T01:45:36',
    '2018-03-05T01:45:36Z',
    '2018-03-05T01:45:36.999',
    '2018-03-05T01:45:36.999Z',
    '2018-03-05T01:45:36.999+0100',
    '2018-03-05T01:45:36.999+07:00',
    '2018-03-05T03:08:02.177+0100'
];

describe('date', () => {
    for (const str of ISO8601) {
        it(`should parse ISO8601 string ${str}`, () => {
            const ct = date(str);
            expect(ct.toISOString()).to.equal(new Date(str).toISOString());
        });
    }
});
