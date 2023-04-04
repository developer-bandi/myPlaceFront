import axiosInstance from "./core";

axiosInstance.defaults.baseURL += "auth/";

interface signinInfo {
  localId: string;
  password: string;
}

interface signupInfo extends signinInfo {
  nickname: string;
  email: string;
}

interface changePasswordInfo {
  password: string;
  newPassword: string;
}

interface findAndChangePasswordInfo {
  email: string;
  newPassword: string;
}

const authApi = {
  localSignup: (userData: signupInfo) => axiosInstance.post("join", userData),

  localSignin: (userData: signinInfo) => axiosInstance.post("login", userData),

  checkSignin: () => axiosInstance.get("logincheck"),

  logout: () => axiosInstance.get("logout"),

  changePassword: (passwordInfo: changePasswordInfo) =>
    axiosInstance.patch("password", passwordInfo),

  deleteUser: () => axiosInstance.delete("user"),

  searchId: (email: string) =>
    axiosInstance.post("id", {
      email,
    }),

  findAndChangePassword: (
    findAndChangePasswordInfo: findAndChangePasswordInfo
  ) =>
    axiosInstance.post("password", {
      findAndChangePasswordInfo,
    }),

  getNoticeList: (findAndChangePasswordInfo: findAndChangePasswordInfo) =>
    axiosInstance.post("notice", {
      findAndChangePasswordInfo,
    }),

  changeNoticeStatus: (noticeId: number) =>
    axiosInstance.post("notice", {
      noticeId,
    }),
};

export default authApi;
