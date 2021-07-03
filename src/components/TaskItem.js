import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };

  onOpenForm = () => {
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  };

  render() {
    var { task, index } = this.props; //var task = this.props.task, this is ES6 syntax
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            onClick={this.onUpdateStatus}
            className={
              task.status === true ? "badge bg-success" : "badge bg-danger"
            }
          >
            {task.status === true ? "Active" : "Passive"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning me-3"
            onClick={this.onOpenForm}
          >
            <FontAwesomeIcon icon="pencil-alt" className="me-2" />
            Update
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <FontAwesomeIcon icon="trash-alt" className="me-2" />
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    itemEditting: state.itemEditting,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => dispatch(actions.updateStatus(id)),
    onDelete: (id) => dispatch(actions.deleteTask(id)),
    onOpenForm: (id) => dispatch(actions.openForm()),
    onEditTask: (task) => dispatch(actions.editTask(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
