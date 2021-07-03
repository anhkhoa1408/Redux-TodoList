import * as types from "../constants/ActionTypes";

var initState = {
  name: "name",
  value: 1,
};

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SORT:
      return action.sort;
    default:
      return state;
  }
};

export default myReducer;
