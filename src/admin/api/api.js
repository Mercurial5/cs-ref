import {user} from "./tools/axios";

export default {
    async users(role) {
        const response = await user.get("/users/?role=" + role);
        return response.data;
    },
};
