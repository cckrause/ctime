import ctime from 'ctime';

describe('immutability', () => {
    it(`fluent interface should not mutate ref timestamp`, () => {
    	const a = ctime('1986-12-06T02:08:02.177+0000');
    	const b = a.add(2, 'h');
        expect(a.toString()).toEqual('1986-12-06T02:08:02.177Z');
        expect(b.toString()).toEqual('1986-12-06T04:08:02.177Z');
    });
});