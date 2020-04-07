import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import GithubContext from '../../context/github/githubContext';


const Users = () => {
  
  const { loading, users, previousSearch } = useContext(GithubContext);
 
  if (loading) {
    return <Spinner />;
  } else if (previousSearch && users.length === 0 || users.length === undefined) {
    return <h2> No accounts were found under the name {previousSearch}. </h2>;
  } else if (!previousSearch && users.length === 0){
    return ( 
      <h1 className="text-center">
        Please begin by typing in a name. (Try "Richard Garza"){" "}
      </h1>
      )
  }
  else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;
