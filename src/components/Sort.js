import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

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
    this.props.onSort(sortBy, sortValue);
  };

  render() {
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
                  this.props.sortBy === "name" && this.props.sortValue === 1
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
                  this.props.sortBy === "name" && this.props.sortValue === -1
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
                  this.props.sortBy === "status" && this.props.sortValue === 1
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
                  this.props.sortBy === "status" && this.props.sortValue === -1
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

export default Sort;
