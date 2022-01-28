import { createStore } from "redux";
import MergeSort from "./sorting/TestMergeSort";

const reducer = (state, action) => {
    switch (action.type) {
        case "LoadNew":
            let obj = MergeSort(action.payload.array)
            state = {
                obj: obj,
                array: obj[new String(0)],
                currentStep: 0,
                userArray: new Array()
            }
            break;

        case "SortNext":
            state = {
                obj: state.obj,
                array: state.obj[new String (state.currentStep + 1)],
                currentStep: state.currentStep + 1,
                userArray: state.array
            }
            break;
        
        case "ChangeElement":
            let newArr = state.userArray
            newArr[action.payload.index] = action.payload.value
            state = {
                obj: state.obj,
                array: state.array,
                currentStep: state.currentStep,
                userArray: newArr
            }
            break;
    }
    return state
}

const store = createStore(reducer,1)

export default store