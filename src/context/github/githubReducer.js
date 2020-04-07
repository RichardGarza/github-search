import{ 
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    SET_PREVIOUS,
    GET_REPOS
    } from '../types';

export default (state, action) => {
    switch(action.type){
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload.users,
                previousSearch: action.payload.previousSearch,
                loading: false
            }
        case CLEAR_USERS:
        return {
            ...state,
            users: [],
            previousSearch: ""
        }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default: 
        return state;
    }
}