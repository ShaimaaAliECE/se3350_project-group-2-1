import { createStore } from "redux";
import MergeSort from "./sorting/TestMergeSort";

const reducer = (state, action) => {
    switch (action.type) {
        case "LoadNew":
            let stepsObject = MergeSort(action.payload.array)
            state = {
                stepsObject: stepsObject,
                currentStep: 0,
                clickedArray: new Array()
            }
            break;

        case "SortNext":
            state = {
                stepsObject: state.stepsObject,
                currentStep: state.currentStep + 1,
                clickedArray: new Array()
            }
            break;
        
        case "ChangeClickedArray":
            state = {
                stepsObject: state.stepsObject,
                currentStep: state.currentStep,
                clickedArray: action.payload.array
            }
            break;
    }
    return state
}

const store = createStore(reducer,1)

export default store