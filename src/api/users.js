import axios from "axios";

export const usersIndex = () => {
    return axios.get('/user');
}