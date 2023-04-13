import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../store";
import { signupState } from "../store/reducers/userLogin/Reducer";

export interface ServerDataState {
  content?: { count: number; rows: unknown };
  error: boolean;
  loading: boolean;
}

const useGetServerData = (api: () => Promise<AxiosResponse>) => {
  const [serverData, setserverData] = useState<ServerDataState>({
    loading: true,
    error: false,
  });
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosNoticeList = await api();
        setserverData({
          content: axiosNoticeList.data,
          loading: false,
          error: false,
        });
      } catch (e) {
        setserverData({
          loading: false,
          error: true,
        });
      }
    };
    if (loginedUser.content !== undefined) {
      asyncWrapFn();
    }
  }, []);

  return { serverData, setserverData };
};

export default useGetServerData;
