


const distance = (arr1: Array<number>, arr2: Array<number>, index: number) : number => {
    let value = arr1[index]
    var arr2Index = 0;

    for(let i = 0; i < arr2.length; i ++){
        if(arr2[i]=== value){
            arr2Index = i
        }
    }
    
    console.log(index)
    console.log(arr2Index)


    return 0
}


let arr1 = [5,3,7,4,9]
let arr2 = [8,7,1,2,5]

distance(arr1, arr2, 2)