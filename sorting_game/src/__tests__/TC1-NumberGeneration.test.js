import generateArray from '../utils/arrayGenerator.js';

it('Array Size (5):', () => {
  let size = 5;
  let arr = generateArray(size,0,5);
  expect(arr.length).toEqual(size);
  
});

it('Array Size (10):', () => {
  let size = 10;
  let arr = generateArray(size,0,5);
  expect(arr.length).toEqual(size);
  
});

it('Array Size (15):', () => {
  let size = 15;
  let arr = generateArray(size,0,5);
  expect(arr.length).toEqual(size);
  
});

it('Array Value Range (5):', () => {
  let range = 5;
  let maxVal = 0;
  let pass = true;
  let arr = generateArray(10,0,range);
  for(let i =0; i<arr.length;i++){
    if(arr[i]>maxVal){
      maxVal = arr[i];
    }
  }
  if(maxVal > range){
    pass = fasle;
  }
  expect(pass).toEqual(true);
});

it('Array Range (10):', () => {
  let range = 10;
  let maxVal = 0;
  let pass = true;
  let arr = generateArray(10,0,range);
  for(let i =0; i<arr.length;i++){
    if(arr[i]>maxVal){
      maxVal = arr[i];
    }
  }
  if(maxVal > range){
    pass = fasle;
  }
  expect(pass).toEqual(true);
});

it('Array Range (15):', () => {
  let range = 15;
  let maxVal = 0;
  let pass = true;
  let arr = generateArray(10,0,range);
  for(let i =0; i<arr.length;i++){
    if(arr[i]>maxVal){
      maxVal = arr[i];
    }
  }
  if(maxVal > range){
    pass = fasle;
  }
  expect(pass).toEqual(true);
});


