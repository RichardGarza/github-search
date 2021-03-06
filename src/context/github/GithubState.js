import React, { useReducer } from 'react';
import axios from 'axios'
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import{ 
SEARCH_USERS,
SET_LOADING,
CLEAR_USERS,
GET_USER,
SET_PREVIOUS,
GET_REPOS
} from '../types'

const GithubState = props => {
    const initialState ={
        users: [],
        user: {},
        repos: [],
        loading: false,
        previousSearch: ""
    }

    const [state, dispatch] = useReducer( githubReducer, initialState )

    // Search Users
    const searchUsers = async text => {
      
        setLoading();
        setPreviousSearch(text);
        
        const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
            
        dispatch({
            type: SEARCH_USERS,
            payload: {
                users: res.data.items,
                previousSearch: text
            }
        })
    };

    // Get User
    // Get Repos
    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Set Loading 
    const setLoading = () => dispatch({ type: SET_LOADING });
    
    // Set Previous 
    const setPreviousSearch = () => dispatch({ type: SET_PREVIOUS });

    return<GithubContext.Provider
    value={ {
        users : state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        previousSearch: state.previousSearch,
        searchUsers,
        clearUsers
    }}>
        {props.children}

    </GithubContext.Provider>

}


export default GithubState;