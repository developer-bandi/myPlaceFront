import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";

export interface ServerDataState {
  content?: {count: number; rows: unknown};
  error: boolean;
  loading: boolean;
}

const useGetServerData = (api: () => Promise<AxiosResponse>) => {
  const [serverData, setserverData] = useState<ServerDataState>({
    loading: true,
    error: false,
  });

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
    asyncWrapFn();
  }, []);

  return {serverData, setserverData};
};

export default useGetServerData;
