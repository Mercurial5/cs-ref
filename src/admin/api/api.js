import {user} from "./tools/axios";

export default {
    async users(role, page) {
        const response = await user.get("/users/?role=" + role + "&page=" + page);
        return response.data;
    },

    async applications(page = 1) {
        const response = await user.get("/applications/")
        return response.data;
    }
};
