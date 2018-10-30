import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
} from "../constants/action-types";

const initialState = {
    user: {},
    token: "",
    
    loggedIn: false,

    signInProgress: false,
    signInComplete: false,
    signInError: false,
};
  
const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {...state, signInProgress: true, signInComplete: false, signInError: false}
        case SIGNIN_SUCCESS:
            return {...state, signInProgress: false, signInComplete: true, signInError: false}
        case SIGNIN_FAILURE:
            return {...state, signInProgress: false, signInComplete: false, signInError: true}
        default:
            return state;
    }
};
  
export default signInReducer;