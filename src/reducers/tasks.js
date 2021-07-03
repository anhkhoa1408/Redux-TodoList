import * as types from "./../constants/ActionTypes";

var generateString = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

var generateID = () =>
  generateString() + generateString() + "-" + generateString();

var data = JSON.parse(localStorage.getItem("tasks"));

var initState = data ? data : [];

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      var newTask = {
        id: action.task.id,
        name: action.task.name,
        status: action.task.status === "true" ? true : false,
      };
      if (newTask.id === "") {
        newTask.id = generateID();
        state.push(newTask);
      } else {
        var findTask = state.find((task) => task.id === action.task.id);
        var idx = state.indexOf(findTask);
        state[idx] = newTask;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS_TASK:
      var task = state.find((task) => task.id === action.id);
      var index = state.indexOf(task);
      var tasks = state;
      tasks[index].status = !tasks[index].status;
      state = tasks;
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.DELETE_TASK:
      task = state.find((task) => task.id === action.id);
      index = state.indexOf(task);
      tasks = state;
      tasks.splice(index, 1);
      state = tasks;
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
