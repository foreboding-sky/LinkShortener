import axios from 'axios';
export function Register(data) {
    return (dispatch) => {
        return axios.post("/api/Auth/register", data).then(res => {
            console.log(res);
        });
    };;
}