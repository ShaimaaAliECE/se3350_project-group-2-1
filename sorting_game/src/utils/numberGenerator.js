//function
function createArray(size, range) {
   console.log(size + "," + range)
   
    //declare array
    var a=[];
    //for loop to iterate over array
    for (let i=0;i<size;++i) {
        //create random value and set in array
        let value = Math.floor(Math.random() * (range + 1));
        a[i] = value;
    }
    //return array

    console.log(a)
    return a;
}
//export function
export default createArray;