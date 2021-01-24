import axios from "axios";


const instance = axios.create({
    // indirizzo locale che ho settato per applicazione
    baseURL: 'http://localhost:9000'
})

export default instance;