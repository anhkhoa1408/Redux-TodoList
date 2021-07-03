import React, { Component } from "react";
import "../components/fontawesome/Icon.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Input keyword..."
            name="keyword"
            value={this.state.keyword}
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onSearch}
            >
              <FontAwesomeIcon icon="search" className="me-2" />
              Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.search(keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
