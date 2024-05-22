import axios from "axios";
const API_URL = "https://192.168.56.1:7177/api/Users/"; // API URL

class AuthService {
    async login(email, password) {
        console.log("poshla voznya1");

        const config = {
            headers:{
                email: email,
                password: password,
            }
        };

        const data = {
            email: email,
            password: password,
        };
        console.log(data);

        const response = await axios
            .post(API_URL + "login", data, config);
        if (response.data.accesToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, password) {
        return axios.post(API_URL + "register", {
            email,
            password,
        });
    }

}

export default new AuthService();