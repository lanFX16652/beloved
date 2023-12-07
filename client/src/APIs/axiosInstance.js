import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)
    if (user) {
        config.headers = {
            'Authorization': 'Bearer ' + user.accessToken
        }
    }
    return config;
})


export default axiosInstance;;