import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };

  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
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
            onClick={this.onUpdate}
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

export default TaskItem;
