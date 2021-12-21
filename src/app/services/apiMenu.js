import axios from "axios";

export const getMenu = async () => {
    const res = await axios.get('/menu');
    return res.data;
}