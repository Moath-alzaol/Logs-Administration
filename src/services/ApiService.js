import axios from "axios";

class ApiService {
    baseURL = "https://run.mocky.io/v3/";
    api() {
        return axios.create({ baseURL: this.baseURL });
    }
}

export const apiService = new ApiService();
