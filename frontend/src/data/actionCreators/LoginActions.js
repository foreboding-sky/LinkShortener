import axios from 'axios';
import setAuthorizationToken from './../../utils/SetAutrhorizationToken';
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}
export function Logout(data) {
    return (dispatch) => {
        return axios.post("/api/Auth/logout", data).then(res => {
            console.log(res);
            setAuthorizationToken(false);
            localStorage.removeItem('jwtToken');
            dispatch(setCurrentUser({}));
        });
    };;
}

export function Login(data) {
    return (dispatch) => {
        return axios.post("/api/Auth/login", data).then(res => {
            const token = res.data.token;

            localStorage.setItem('jwtToken', token);

            setAuthorizationToken(token);

            axios.get(getMyProfile).then(res => {
                dispatch(setCurrentUser(res.data));
            });
        });
    };;
}