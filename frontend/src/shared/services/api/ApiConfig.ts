import axios from "axios"

export const Api = () => {
    return axios.create({
        baseURL: "http://localhost/consulta-covid/backend/public/api"
    });
}