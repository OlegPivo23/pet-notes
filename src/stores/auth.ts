import { ref } from "vue";
import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;

interface UserInfo {
  token: string;
  email: string;
  userId: string;
  refreshToken: string;
}

interface AuthPayload {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

type AuthType = "signup" | "signin";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref<UserInfo>({
    token: "",
    email: "",
    userId: "",
    refreshToken: "",
  });

  const error = ref<string>("");
  const loader = ref<boolean>(false);

  const auth = async (payload: AuthPayload, type: AuthType): Promise<void> => {
    const stringUrl = type === "signup" ? "signUp" : "signInWithPassword";
    error.value = "";
    loader.value = true;
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true,
        }
      );
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
      };
      localStorage.setItem(
        "userTokens",
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
        })
      );
    } catch (err: any) {
      switch (err.response.data.error.message) {
        case "EMAIL_EXISTS":
          error.value = "Email exists";
          break;
        case "OPERATION_NOT_ALLOWED":
          error.value = "Operation not allowed";
          break;
        case "EMAIL_NOT_FOUND":
          error.value = "Email not found";
          break;
        case "INVALID_PASSWORD":
          error.value = "Invalid password";
          break;
        default:
          error.value = "Error";
          break;
      }
      throw new Error(error.value);
    } finally {
      loader.value = false;
    }
  };

  const logout = (): void => {
    userInfo.value = {
      token: "",
      email: "",
      userId: "",
      refreshToken: "",
    };
  };

  return { auth, userInfo, error, loader, logout };
});
