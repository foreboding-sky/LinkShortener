import axios from 'axios';
export function Register(data) {
    return (dispatch) => {
        return axios.post("/api/Authentication/Register", data).then(res => {
            console.log(res);
        });
    };;
}