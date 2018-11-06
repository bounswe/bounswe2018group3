import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
} from "../constants/action-types";

const initialState = {
    user: {},
    token: "",
    
    isAuthenticated: false,

    signUpProgress: false,
    signUpComplete: false,
    signUpError: false,
};
  
const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {...state, signUpProgress: true, signUpComplete: false, signUpError: false}
        case SIGNUP_SUCCESS:
            return {...state, signUpProgress: true, signUpComplete: false, signUpError: false}
        case SIGNUP_FAILURE:
            return {...state, signUpProgress: true, signUpComplete: false, signUpError: false}
        default:
            return state;
    }
};
  
export default signUpReducer;