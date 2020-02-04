import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repos = ({ repos }) => {
  return repos.map(repo => (
    <div className="card">
      <RepoItem repo={repo} key={repo.id} />
    </div>
  ));
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
