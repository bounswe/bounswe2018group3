import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    SIGNOUT_REQUEST,
} from "../constants/action-types";

const initialState = {
    user: {},
    token: "",
    
    loggedIn: false,

    signInProgress: false,
    signInComplete: false,
    signInError: false,
    
    signUpProgress: false,
    signUpComplete: false,
    signUpError: false,
};
  
const signOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {...state, signInProgress: true, signInComplete: false, signInError: false}
        case SIGNIN_SUCCESS:
            return {...state, signInProgress: false, signInComplete: true, signInError: false}
        case SIGNIN_FAILURE:
            return {...state, signInProgress: false, signInComplete: false, signInError: true}
        case SIGNOUT_REQUEST:
            return {...state, signInProgress: false, signInComplete: false, signInError: false}
        default:
            return state;
    }
};
  
export default signOutReducer;