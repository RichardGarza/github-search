import React, { useState,  Fragment } from "react";

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

const App = () => {

const [users, setUsers] = useState([]);
const [user, setUser] = useState({});
const [repos, setRepos] = useState([]);
const [loading, setLoading] = useState(false);
const [previousSearch, setPreviousSearch] = useState("");


  // Method to get rid of search items from view (only available after searching)
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    setPreviousSearch("")
  };

  // Search GitHub Users
  const searchUsers = async text => {
    setLoading(true);
    setPreviousSearch(text);
    
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUsers(res.data.items);
  };

  // Get Single User
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(res.data);
  };

  // Get User's Repositories
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setRepos(res.data);
  };

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
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
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
                      <h1 className="text-center">
                        Please begin by typing in a name. (Try "Richard Garza"){" "}
                      </h1>
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
                    getUser={getUser}
                    getUserRepos={getUserRepos}
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

export default App;
