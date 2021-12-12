import axios from "axios";

export const listCustomers = () => {
    return axios.post('/sosmed/list_customers');
}