import MergeSort from '../utils/sorting/MergeSort.js';

it('MergeSort returns Array of steps that can be displayed:', () => {
    let size = 10;
    let range = 10;
    let result = MergeSort(size, range);
    for(let i = 0; i < result.length;i++){
        console.log(result[i]);
    }
    expect(result[result.length-1][0]).toBe('Final');
});