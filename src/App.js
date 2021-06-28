import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import "./components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  generateString = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  generateID = () =>
    this.generateString() + this.generateString() + "-" + this.generateString();

  onToggleForm = () => {
    if (this.state.taskEditting) {
      this.setState({
        taskEditting: null,
      });
    } else if (!this.state.isDisplayForm) {
      this.setState({
        isDisplayForm: true,
        taskEditting: null,
      });
    } else {
      this.setState({
        isDisplayForm: false,
        taskEditting: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onSubmit = (data) => {
    var tasks = this.state.tasks;
    if (data.id === "") {
      var task = {
        id: this.generateID(),
        name: data.name,
        status: data.status,
      };
      tasks.push(task);
    } else {
      var index = this.state.tasks.findIndex((task) => task.id === data.id);
      tasks[index] = {
        id: data.id,
        name: data.name,
        status: data.status,
      };
    }
    this.setState({
      tasks: tasks,
      taskEditting: null,
    });
    this.setLocalStorage(tasks);
  };

  onUpdateStatus = (id) => {
    var task = this.state.tasks.find((task) => task.id === id);
    var index = this.state.tasks.indexOf(task);
    var tasks = this.state.tasks;
    tasks[index].status = !tasks[index].status;
    this.setState({
      tasks: tasks,
    });
    this.setLocalStorage(tasks);
  };

  onDelete = (id) => {
    var tasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: tasks,
    });
    this.setLocalStorage(tasks);
    this.onCloseForm();
  };

  onUpdate = (id) => {
    if (this.state.taskEditting) this.setState({ taskEditting: null });
    if (!this.state.isDisplayForm) this.onToggleForm();
    var index = this.state.tasks.findIndex((task) => task.id === id);
    var taskEditting = this.state.tasks[index];
    this.setState({
      taskEditting: taskEditting,
    });
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  setLocalStorage = (tasks) =>
    localStorage.setItem("tasks", JSON.stringify(tasks));

  onSort = (sortBy, sortValue) => {
    // console.log(sortBy, sortValue)
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
    // console.log(this.state.sortBy, this.state.sortValue)
  };

  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditting,
      filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state;
    // Filter section
    if (filter) {
      if (filter.name) {
        if (filter.name) {
          tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(filter.name) !== -1;
          });
        }
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) return tasks;
        else return task.status === (filter.status === 1 ? true : false);
      });
    }
    // Search section
    if (keyword !== "") {
      keyword = keyword.toLowerCase();
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    // Display form by task edit
    var eleTaskForm = isDisplayForm ? (
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmit={this.onSubmit}
        taskEditting={taskEditting}
      />
    ) : (
      ""
    );

    if (sortBy === "name") {
      tasks = tasks.sort((ele1, ele2) => {
        if (ele1.name > ele2.name) return sortValue;
        else if (ele1.name < ele2.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks = tasks.sort((task1, task2) => {
        if (task1.status > task2.status) return -sortValue;
        else if (task1.status < task2.status) return sortValue;
        else return 0;
      });
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Todo List</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm === true
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : ""
            }
          >
            {eleTaskForm}
          </div>

          <div
            className={
              isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary me-3"
              onClick={this.onToggleForm}
            >
              <FontAwesomeIcon icon="plus" className="me-2" />
              Add
            </button>

            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
