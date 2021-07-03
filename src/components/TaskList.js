import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";

import * as actions from "./../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };
  }

  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus,
    };
    this.setState({
      [name]: value,
    });
    this.props.onFilter(filter);
  };

  render() {
    var { tasks, filter, search, sort } = this.props;
    var { filterName, filterStatus } = this.state;
    // Sort section
    if (sort.name === "name") {
      tasks = tasks.sort((ele1, ele2) => {
        if (ele1.name > ele2.name) return sort.value;
        else if (ele1.name < ele2.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks = tasks.sort((task1, task2) => {
        if (task1.status > task2.status) return -sort.value;
        else if (task1.status < task2.status) return sort.value;
        else return 0;
      });
    }

    // Search section
    if (search !== "") {
      search = search.toLowerCase();
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(search) !== -1;
      });
    }

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

    var elmTasks = tasks.map((task, index) => (
      <TaskItem key={task.id} index={index} task={task} />
    ));

    return (
      <table className="table table-bordered table-hover mt-5">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>All</option>
                <option value={0}>Passive</option>
                <option value={1}>Active</option>
              </select>
            </td>
            <td></td>
          </tr>

          {elmTasks}
        </tbody>
      </table>
    );
  }
}

// chuyen cac state cua store ve props cua component
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filter: state.filter,
    search: state.search,
    sort: state.sort
  };
};

const mapDispatchToProps = (dispatch, action) => {
  return {
    onFilter: (filter) => {
      dispatch(actions.filterTask(filter));
    },
  };
};

// su dung ham connect
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
