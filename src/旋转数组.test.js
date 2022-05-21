import {rotate1,rotate2} from './旋转数组'


describe('旋转数组', () => {
    it('正常', () => {
        const arr = [1,2,3,4,5,6,7]
        const k = 3
        expect(rotate1(arr,k)).toEqual([5,6,7,1,2,3,4]);
    });
    it('k是0', () => {
        const arr = [1,2,3,4,5,6,7]
        const k = 0
        expect(rotate1(arr,k)).toEqual([1,2,3,4,5,6,7]);
    });
    it('arr是[]', () => {
        const arr = [1,2,3,4,5,6,7]
        const k = 0
        expect(rotate1(arr,k)).toEqual([]);
    });
});
