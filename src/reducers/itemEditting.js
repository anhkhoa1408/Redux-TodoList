import * as types from '../constants/ActionTypes'

var initState = {
    id: "",
    name: "",
    status: false
};

var myReducer = (state = initState, action) => {
    switch(action.type) {
        case types.EDIT_TASK:
            state = action.task
            return state
        default: return state
    }
}

export default myReducer;