import * as actionTypes from './actionTypes';
import axios from 'axios';

const token = process.env.NODE_ENV === 'development' ? 'AIzaSyCNOP99SASr0bAoTXhXMfc2ErURST2SPZ4' : null;

export const authSuccess = (idToken, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, idToken, userId };
};

export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error };
};

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkTokenTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    let endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${token}`;

    if (!isSignUp) {
      endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`;
    }
    axios
      .post(endpoint, data)
      .then((response) => {
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(data.idToken, data.localId));
        dispatch(checkTokenTimeout(data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = localStorage.getItem('expirationDate');

      if (new Date() > expirationDate) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));

        const timeOut = new Date(expirationDate).getTime() - new Date().getTime();
        dispatch(checkTokenTimeout(timeOut / 1000));
      }
    }
  };
};
