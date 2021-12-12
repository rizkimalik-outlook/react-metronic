import axios from "axios";

export const getMenu = () => {
    return axios.get('/menu');
}