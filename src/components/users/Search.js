import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, clearUsers, users }) => {
  const  [ text, setText ] = useState('');
  const  [ emptySearch, setEmptySearch ] = useState(false);

  const onChange = e => {
    if (emptySearch === true) {
      setEmptySearch( false );
    }
    setText(e.target.value );
  };
  const onSubmit = e => {
    e.preventDefault();
    text === ""
      ? emptySearchAlert()
      : searchUsers(text);
    setText( "" );
  };

 const emptySearchAlert = () => {
    setEmptySearch( true );
    setTimeout(() => {
      setEmptySearch( false );
    }, 4000);
  };


    return (
      <div>
        <form onSubmit={onSubmit} className="form">
          <input
            onChange={onChange}
            type="text"
            name="text"
            value={text}
            placeholder="Search Users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {emptySearch && (
          <h3 className="alert alert-light text-center">
            You Must Type A Name To Search
          </h3>
        )}

        {users.length !== 0 && (
          <button
            onClick={clearUsers}
            className="btn btn-light btn-block"
          >
            Clear
          </button>
        )}
      </div>
    );
  
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired
};

export default Search;
