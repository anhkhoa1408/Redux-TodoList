import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import "./components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends Component {
  onToggleForm = () => {
    if (this.props.itemEditting.id === "") this.props.onToggle();
    this.props.onClearTask();
  };

  render() {
    var { isDisplayForm } = this.props;

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
            <TaskForm />
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

            <Control />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditting: state.itemEditting,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggle: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: () => {
      dispatch(
        actions.editTask({
          id: "",
          name: "",
          status: false,
        })
      );
    },
    onOpenForm: (id) => dispatch(actions.openForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
