import type {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthSignupRequestDto,
  AuthSignupResponseDto,
} from "@/commons/dtos/auth.dto";
import type { UserInfo } from "@/commons/types/userinfo.types";
import { decryptAES } from "@/commons/utils/crypto-helper";
import { localStorageUtil } from "@/commons/utils/local-storage";
import config from "@/config";
import axios from "axios";
import { Cookies } from "react-cookie";

export type SuccessLoginCallback = (data: AuthLoginResponseDto) => void;
export type SuccessSignupCallback = (data: AuthSignupResponseDto) => void;
export type FailureCallback = (error: Error) => void;

export const login = (
  body: AuthLoginRequestDto,
  onSuccess: SuccessLoginCallback,
  onFailure: FailureCallback,
): void => {
  axios
    .post(`${config.SERVER_URI}/auth/login`, body, { withCredentials: true })
    .then((response) => {
      const data = response.data as AuthLoginResponseDto;

      localStorageUtil.setItem<UserInfo>("user", {
        id: data.id,
        nickname: data.nickname,
        publicKey: data.publicKey,
        privateKey: decryptAES(body.password, data.encryptedPrivateKey),
      });

      onSuccess(data);
    })
    .catch((err) => {
      const messaage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Login failed";
      onFailure(new Error(messaage));
    });
};

export const signup = (
  body: AuthSignupRequestDto,
  onSuccess: SuccessSignupCallback,
  onFailure: FailureCallback,
): void => {
  axios
    .post(`${config.SERVER_URI}/auth/signup`, body, { withCredentials: true })
    .then((response) => {
      onSuccess(response.data as AuthSignupResponseDto);
    })
    .catch((err) => {
      const messaage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Signup failed";
      onFailure(new Error(messaage));
    });
};

export const logout = () => {
  new Cookies().remove("access_token");
  localStorageUtil.removeItem("user");
};
