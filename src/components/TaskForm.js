import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

import { connect } from "react-redux";
import * as actions from "./../actions/index";

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

  // componentDidMount() {
  //   var { itemEditting } = this.props;
  //   if (itemEditting) {
  //     var id = itemEditting.id;
  //     var name = itemEditting.name;
  //     var status = itemEditting.status;
  //     this.setState({
  //       id: id,
  //       name: name,
  //       status: status,
  //     });
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.itemEditting) {
      if (props.itemEditting.id !== state.id) {
        return {
          id: props.itemEditting.id,
          name: props.itemEditting.name,
          status: props.itemEditting.status,
        };
      }
    } else {
      if (state.id) {
        return {
          id: "",
          name: "",
          status: false,
        };
      }
    }
    return null;
  }

  onCloseForm = () => this.props.onClose();

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
    // console.log(this.state)
  };

  onClear = (e) => {
    e.preventDefault();
    this.setState({
      id: "",
      name: "",
      status: false,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveTask(this.state);
    // this.onClear()
    this.setState({
      id: "",
      name: "",
      status: false,
    });
    this.onCloseForm();
  };

  render() {
    var { isDisplayForm} = this.props;
    if (isDisplayForm === true) {
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
    } else {
      return null;
    }
  }
}
// chuyen state tu store thanh props cua component
const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditting: state.itemEditting
  };
};

// chuyen action thanh props
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onClose: () => {
      dispatch(actions.closeForm());
    },
  };
};

// Tham so thu 2 cua connect la 1 action
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
