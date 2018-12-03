import ctime from 'ctime';

describe('diff', () => {
    it('diff ctime(-1 hour) ctime(+1 hour)', () => {
        const t1 = ctime().subtract(1, 'h');
        const t2 = ctime().add(1, 'h');

        const diff = t1.diff(t2)
        expect(diff / 60).to.equal(120); // diff should be 2h
    });
});
