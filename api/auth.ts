import {
  checkSigninRes,
  logoutApiRes,
  localSigninRes,
  localSignupRes,
  deleteUserRes,
  searchIdRes,
  findAndChangePasswordRes,
  getNoticeListRes,
  changeNoticeStatusRes,
} from "../type/auth";
import axiosInstance from "./core";
interface signinInfo {
  localId: string;
  password: string;
}

interface signupInfo extends signinInfo {
  nickname: string;
  email: string;
}
interface findAndChangePasswordInfo {
  email: string;
  newPassword: string;
}

export const localSignup = (userData: signupInfo) =>
  axiosInstance.post<localSignupRes>("auth/join", userData);

export const localSignin = (userData: signinInfo) =>
  axiosInstance.post<localSigninRes>("auth/login", userData);

export const checkSignin = () =>
  axiosInstance.get<checkSigninRes>("auth/logincheck");

export const logout = () => axiosInstance.get<logoutApiRes>("logout");

export const deleteUser = () =>
  axiosInstance.delete<deleteUserRes>("auth/user");

export const searchId = (email: string) =>
  axiosInstance.post<searchIdRes>("auth/id", {
    email,
  });

export const findAndChangePassword = (
  findAndChangePasswordInfo: findAndChangePasswordInfo
) =>
  axiosInstance.post<findAndChangePasswordRes>("auth/password", {
    findAndChangePasswordInfo,
  });

export const getNoticeList = () =>
  axiosInstance.get<getNoticeListRes>("auth/notice");

export const changeNoticeStatus = (noticeId: number) =>
  axiosInstance.patch<changeNoticeStatusRes>("auth/notice", {
    noticeId,
  });
