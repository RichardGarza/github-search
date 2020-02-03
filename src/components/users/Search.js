import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
    emptySearch: false
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired
  };

  emptySearchAlert = () => {
    this.setState({ emptySearch: true });
    setTimeout(() => {
      this.setState({ emptySearch: false });
    }, 4000);
  };

  onChange = e => {
    if (this.state.emptySearch === true) {
      this.setState({ emptySearch: false });
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.state.text === ""
      ? this.emptySearchAlert()
      : this.props.searchUsers(this.state.text);

    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            onChange={this.onChange}
            type="text"
            name="text"
            value={this.state.text}
            placeholder="Search Users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.state.emptySearch && (
          <h3 className="alert alert-light text-center">
            You Must Type A Name To Search
          </h3>
        )}

        {this.props.users.length !== 0 && (
          <button
            onClick={this.props.clearUsers}
            className="btn btn-light btn-block"
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
