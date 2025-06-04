import { tokens } from "@/constants/tokens.constant";
import Cookies from "js-cookie";

export default class AuthTokenService {
    static getAccessToken() {
        const accessToken = Cookies.get(tokens.ACCESS_TOKEN);
        return accessToken;
    }

    static saveAccessToken = (accessToken: string) => {
        Cookies.set(tokens.ACCESS_TOKEN, accessToken, {
            domain: "localhost",
            sameSite: "Strict",
            expires: 1,
            secure: true,
        });
    };

    static removeAccessToken() {
        Cookies.remove(tokens.ACCESS_TOKEN);
    }
}
