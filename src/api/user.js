import axios from "axios";

export const userIndex = () => {
    return axios.get('/user');
}

export const userShow = (id) => {
    return axios.get(`/user/show/${id}`);
}

export const userStore = (data) => {
    return axios.post('/user/store', data);
}

export const userUpdate = (data) => {
    return axios.put('/user/update', data);
}

export const userDelete = (id) => {
    return axios.delete(`/user/delete/${id}`);
}

export const userResetPassword = (data) => {
    return axios.put('/user/reset_password', data);
}