const createArray = require('../numberGenerator');
const steps = [];

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr1, arr2)
{
    //output merging arrays
    steps.push(['Merge:', arr1, arr2]);
    // Create temp array
    var arr = []; 
  
    // Initial index of first subarray
    // Initial index of second subarray
    // Initial index of merged subarray
    var i = 0;
    var j = 0;
    var k = 0;
  
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            arr.push(arr1[i]);
            i++;
        }
        else {
            arr[k] = arr2[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < arr1.length) {
        arr.push(arr1[i]);
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < arr2.length) {
        arr.push(arr2[j]);
        j++;
        k++;
    }

    // step++;
    //console.log('Merged Array: ' + arr);
    return arr;
}
  
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr,l, r){
    steps.push(['Split',arr.slice(l, r+1)]);

    if(l>=r){
        return [arr[l]];//returns recursively
    }

    var m = l + parseInt((r-l)/2);
    const arr1 = arr.slice(l, m+1);
    const arr2 = arr.slice(m+1, r+1);
    const mergedArr1 = mergeSort(arr1, 0, arr1.length -1); 
    const mergedArr2 = mergeSort(arr2,0, arr2.length - 1);

    const mergedArray = merge(mergedArr1,mergedArr2);
    steps.push(['Merged',mergedArray]);
    steps.push(['Step Up']);

    return mergedArray;
}

function run(size,range){
    const generatedArray = createArray(size,range);

    const result = mergeSort(generatedArray, 0, generatedArray.length -1);
    steps.push(['Result', result]);

    return steps;
}

module.exports = run;

