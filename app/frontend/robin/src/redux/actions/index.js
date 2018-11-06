import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SIGNOUT_REQUEST,
} from "../constants/action-types";

export const signInRequest = (username, password) => ({
    type: SIGNIN_REQUEST,
    payload: {
        username,
        password
    }
});

export const signInSuccess = response => ({
    type: SIGNIN_SUCCESS,
    payload: response
});

export const signInFailure = error => ({
    type: SIGNIN_FAILURE,
    payload: error
});

export const signUpRequest = (username, email, password, password_confirmation, fname, lname) => ({
    type: SIGNUP_REQUEST,
    payload: {
        username,
        email,
        password,
        password_confirmation,
        fname,
        lname
    }
});

export const signUpSuccess = response => ({
    type: SIGNUP_SUCCESS,
    payload: response
});

export const signUpFailure = error => ({
    type: SIGNUP_FAILURE,
    payload: error
});

export const signout = () => ({
    type: SIGNOUT_REQUEST
});