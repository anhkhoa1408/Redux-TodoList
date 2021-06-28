import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const myStyle = {
  textAlign: "center",
  float: "right",
  cursor: "pointer",
};

const HeaderStyle = {
  padding: "10px",
  backgroundColor: "#ffe69a",
  fontWeight: "400",
  fontSize: "18px",
};

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  componentDidMount() {
    var { taskEditting } = this.props;
    if (taskEditting) {
      var id = taskEditting.id;
      var name = taskEditting.name;
      var status = taskEditting.status;
      this.setState({
        id: id,
        name: name,
        status: status,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.taskEditting) {
      if (props.taskEditting.id !== state.id) {
        return {
          id: props.taskEditting.id,
          name: props.taskEditting.name,
          status: props.taskEditting.status,
        };
      }
    } else {
      if (state.id) {
        return {
          id: "",
          name: "",
          status: true,
        };
      }
    }
    return null;
  }

  onCloseForm = () => this.props.onCloseForm();

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onClear = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      status: true,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      id: this.state.id,
      name: this.state.name,
      status: this.state.status === "true" ? true : false,
    };
    this.props.onSubmit(data);
    this.onCloseForm();
  };

  render() {
    var { id } = this.state;
    return (
      <div className="card p-4">
        <div className="card-body">
          <h5 className="card-title bg-warning" style={HeaderStyle}>
            {id === "" ? "Add Task" : "Update Task"}
            <FontAwesomeIcon
              icon="times"
              className="ml-5"
              style={myStyle}
              onClick={this.onCloseForm}
            />
          </h5>
          <form>
            <div className="form-group">
              <label>Name :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Status :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Passive</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="submit"
                onClick={this.onSubmit}
                className="btn btn-warning me-5"
              >
                Save
              </button>
              <button
                type="submit"
                onClick={this.onClear}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
