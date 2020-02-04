import React, { Component, Fragment } from "react";

// Router for Routes
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "./App.css";

// Components
import NavBar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import User from "./components/users/User";
import About from "./components/pages/About";

// For HTTP Requests
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    previousSearch: ""
  };

  // Method to get rid of search items from view (only available after searching)
  clearUsers = () => {
    this.setState({ users: [], loading: false, previousSearch: "" });
  };

  // Search GitHub Users
  searchUsers = async text => {
    this.setState({ loading: true, previousSearch: text });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, users: res.data.items });
  };

  // Get Single User
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, user: res.data });
  };

  // Get User's Repositories
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, repos: res.data });
  };

  render() {
    // Destructuring for simplicity
    const { users, loading, user, previousSearch, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar title="GitHub Finder" icon="fab fa-github" />

          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    {/* // Search Bar */}
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      users={users}
                    />
                    {/* If a search has been made, users will display results of search.   */}
                    {previousSearch ? (
                      <Users
                        users={users}
                        loading={loading}
                        previousSearch={previousSearch}
                      />
                    ) : (
                      <p className="text-center">
                        Begin by typing in a GitHub User's handle.{" "}
                      </p>
                    )}
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
