import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

import {connect} from "react-redux";
import * as actions from "./../actions"

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false,
    };
  }

  static getDerivedStateFromProps(props) {
    return null;
  }

  toggleButton = () => {
    this.setState({
      isDisplay: !this.state.isDisplay,
    });
  };

  onClick = (sortBy, sortValue) => {
    var sort = {
        name: sortBy,
        value: parseInt(sortValue)
    }
    this.props.onSort(sort);
  };

  render() {
    var {sort} = this.props;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={this.toggleButton}
          >
            Sort <FontAwesomeIcon icon="caret-square-down" />
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenu1"
            style={
              this.state.isDisplay === true
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li onClick={() => this.onClick("name", 1)}>
              <a
                href="/#"
                role="button"
                className={
                  sort.name === "name" && sort.value === 1
                    ? "sort-selected"
                    : ""
                }
              >
                <FontAwesomeIcon
                  icon="sort-up"
                  style={{ marginRight: "10px" }}
                />
                Name A-Z
              </a>
            </li>
            <li onClick={() => this.onClick("name", -1)}>
              <a
                href="/#"
                role="button"
                className={
                  sort.name === "name" && sort.value === -1
                    ? "sort-selected"
                    : ""
                }
              >
                <FontAwesomeIcon
                  icon="sort-down"
                  style={{ marginRight: "10px" }}
                />
                Name Z-A
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li onClick={() => this.onClick("status", 1)}>
              <a
                href="/#"
                role="button"
                className={
                  sort.name === "status" && sort.value === 1
                    ? "sort-selected"
                    : ""
                }
              >
                Active Status
              </a>
            </li>
            <li onClick={() => this.onClick("status", -1)}>
              <a
                href="/#"
                role="button"
                className={
                  sort.name === "status" && sort.value === -1
                    ? "sort-selected"
                    : ""
                }
              >
                Passive Status
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sort(sort))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
