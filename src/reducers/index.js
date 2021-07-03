import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import itemEditting from "./itemEditting";
import filter from "./filter";
import search from "./search"
import sort from "./sort"

const myReducer = combineReducers({
  tasks: tasks,
  isDisplayForm: isDisplayForm,
  itemEditting: itemEditting,
  filter: filter,
  search: search,
  sort: sort
});

export default myReducer;
