import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.timeout = 120000;
    }
    return config;
  },
  (error) => {
    alert(
      "알 수 없는 에러가 발생하였습니다. 새로고침을 눌러 다시 시도해주세요"
    );
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error.code;
    const status = error.response?.status;

    if (code === "ECONNABORTED" || status === 408) {
      alert("요청이 만료되었습니다.");
    } else {
      alert(
        "서버에 알 수 없는 에러가 발생했습니다. 새로고침을 눌러 다시 시도해주세요"
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
