import MergeSort from '../utils/sorting/MergeSort.js';

it('MergeSort returns Array:', () => {
    let size = 10;
    let range = 10;
    let result = MergeSort(size, range);
    expect(result);
});

it('MergeSort returns Result:', () => {
    let size = 10;
    let range = 10;
    let result = MergeSort(size, range);
    expect(result[result.length-1][0]).toBe('Final');
});