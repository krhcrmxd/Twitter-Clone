import { axiosAuth } from "@/api/axios.config";
import { IUser, IUserUpdate } from "@/types/user.types";
import AuthTokenService from "./auth-token.service";
import { AuthService } from "./auth.service";

export class UserService {
    static async delete() {
        try {
            AuthService.logoutRefresh();
            await axiosAuth.delete("/user/");
            AuthTokenService.removeAccessToken();
        } catch (e) {
            throw e;
        }
    }

    static async update(data: IUserUpdate) {
        try {
            return axiosAuth.put("/user/", data);
        } catch (e) {
            throw e;
        }
    }

    static async getUnique() {
        try {
            return (await axiosAuth.get<IUser | undefined>("/user/")).data;
        } catch (e) {
            throw e;
        }
    }
}
