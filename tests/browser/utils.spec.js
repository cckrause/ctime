import ctime from 'ctime';
import {expectedDateAsUTCString} from './utils';

const utcStringTests = [
    [
        expectedDateAsUTCString(/*year*/2018, /*month*/12, /*day*/2, /*hour*/17, /*minute*/22, /*second*/40, /*ms*/0, /*utcOffset*/0), 
        '2018-12-02T17:22:40.000Z'
    ],
    [
        expectedDateAsUTCString(/*year*/2018, /*month*/3, /*day*/5, /*hour*/1, /*minute*/45, /*second*/36, /*ms*/999, /*utcOffset*/-3), 
        '2018-03-05T04:45:36.999Z'
    ]
];

describe('utils (helper for test purposes)', () => {
    for (const test of utcStringTests) {
        it(`expectedDateAsUTCString should return string ${test[1]}`, () => {
            expect(test[0]).to.equal(test[1]);
        });
    }
});