import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token') ?? '';
        config.headers!.Authorization = `Bearer ${token}`;
        return config;
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const errMessage = error.response.data.message as string;
        if (errMessage.includes('Unauthorized') && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessToken();
            return axiosClient(originalRequest);
        }
        return Promise.reject(error);
    });

async function refreshAccessToken() {
    axiosClient.get('/auth/refresh_token', { withCredentials: true }).then((data) => {
        localStorage.setItem('access_token', data.data.access_token);
    }).catch((error) => {
    });
}

export default axiosClient;