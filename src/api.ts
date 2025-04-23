import axios from "axios";

const baseURL = "https://api.hash-cash.io/v1/";

export const api = axios.create({
    baseURL,
});

api.interceptors.request.use(
    async (c) => {
        let token = sessionStorage.getItem("authToken");

        if (!token) {
            try {
                const { data } = await axios.get(`${baseURL}auth_user/`);
                token = data.token as string;
                sessionStorage.setItem("authToken", token);
            } catch (error) {
                console.error("Не удалось получить токен", error);
                return Promise.reject(error);
            }
        }

        c.headers["Authorization"] = `Token ${token}`;
        return c;
    },
    (error) => {
        return Promise.reject(error);
    }
);
