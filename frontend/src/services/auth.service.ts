import { axiosAuth, axiosNoAuth } from "@/api/axios.config";
import type { ILogin, IRegister } from "@/types/auth.types";
import type { ILoginRes, INewTokens } from "@/types/responses.types";
import AuthTokenService from "./auth-token.service";

export class AuthService {
    static async getNewTokens() {
        try {
            const response = await axiosNoAuth.post<INewTokens>("/auth/login/access-token");
            if (response.data.accessToken) AuthTokenService.saveAccessToken(response.data.accessToken);
        } catch (e) {
            throw e;
        }
    }

    static async register(data: IRegister) {
        try {
            axiosNoAuth.post<void>("/auth/register", data);
        } catch (e) {
            throw e;
        }
    }

    static async login(data: ILogin) {
        try {
            const { accessToken, ...response } = (await axiosNoAuth.post<ILoginRes>("/auth/login", data))
                .data;
            AuthTokenService.saveAccessToken(accessToken);
            return response;
        } catch (e) {
            throw e;
        }
    }

    static async logout() {
        try {
            await axiosAuth.post("/auth/logout");

            AuthTokenService.removeAccessToken();
        } catch (e) {
            throw e;
        }
    }
    static async logoutRefresh() {
        try {
            await axiosAuth.post("/auth/logout");
        } catch (e) {
            throw e;
        }
    }
}
