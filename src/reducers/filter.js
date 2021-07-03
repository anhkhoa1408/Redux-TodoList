import * as types from "../constants/ActionTypes";

var initState = {
  name: "",
  status: -1,
};

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FILTER:
      action.filter.status = parseInt(action.filter.status)
      return action.filter;
    default:
      return state;
  }
};

export default myReducer;
