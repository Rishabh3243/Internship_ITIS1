import axios from "axios";
import Cookies from "js-cookie";

const CustomAxios = axios.create({});

CustomAxios.interceptors.request.use(

    req => {
        console.log(`${req.method} ${req.url}`);
        req.data[`authtoken`] = Cookies.get("authtoken")
        req.data[`SessionCalenderId`] = localStorage.getItem("SessionCalenderId")
        req.data[`CreateIp`] = localStorage.getItem("CreateIp")
        return req
    },
    error => {
        return Promise.reject(error);
    }
);

CustomAxios.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    },

    (response) => {

        const status = response.response ? response.response.status : null;
        if (status === 401) {
            window.location.replace('/')
        }
        return Promise.resolve(response)

    },
    (error) => {

        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
        console.log(error.response);
        if (error.response.status === 404) {
            console.log("Not found");
            window.location.href = '/'
        }
        else {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
        return Promise.resolve(error)
    },
);

export default CustomAxios;