import axios from 'axios';
import setAuthorizationToken from './../../utils/SetAuthorizationToken';
import { SET_CURRENT_USER } from './Types';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}
export function logout(data) {
    return (dispatch) => {
        return axios.post("/api/Authentication/Logout", data).then(res => {
            console.log(res);
            setAuthorizationToken(false);
            localStorage.removeItem('jwtToken');
            dispatch(setCurrentUser({}));
        });
    };;
}

export function login(data) {
    return (dispatch) => {
        return axios.post("/api/Authentication/Login", data).then(res => {
            const token = res.data.token;

            localStorage.setItem('jwtToken', token);

            setAuthorizationToken(token);

            dispatch(setCurrentUser(jwtDecode(token)));
        });
    };;
}