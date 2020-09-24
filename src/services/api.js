import axios from 'axios';

const api = axios.create({
    baseURL : "https://produtosbackendleo.herokuapp.com/"
});

export default api;