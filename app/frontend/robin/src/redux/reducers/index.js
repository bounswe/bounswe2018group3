import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
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
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {...state, signInProgress: true, signInComplete: false, signInError: false}
        case SIGNIN_SUCCESS:
            return {...state, signInProgress: false, signInComplete: true, signInError: false}
        case SIGNIN_FAILURE:
            return {...state, signInProgress: false, signInComplete: false, signInError: true}
        case SIGNUP_REQUEST:
            return {...state, signUpProgress: true, signUpComplete: false, signUpError: false}
        case SIGNUP_SUCCESS:
            return {...state, signUpProgress: true, signUpComplete: false, signUpError: false}
        case SIGNUP_FAILURE:
            return {...state, signUpProgress: true, signUpComplete: false, signUpError: false}
        case SIGNOUT_REQUEST:
            return {...state, signInProgress: false, signInComplete: false, signInError: false}
        default:
            return state;
    }
};
  
export default rootReducer;