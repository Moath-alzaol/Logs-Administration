import { apiEndPoints } from "../api";
import { handleResponse } from "../utils/misc";
import { apiService } from "./ApiService";

class LogsService {
    async getLogs() {
        try {
            const data = await apiService
                .api()
                .get(apiEndPoints.logs.getLogs)
                .then(({ data }) => data);

            return handleResponse({ success: true, data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }
}

export const logsService = new LogsService();
