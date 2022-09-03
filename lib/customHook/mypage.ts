import {useEffect, useState} from "react";
import {
  axiosGetMyBookMark,
  axiosGetMyComment,
  axiosGetMyPost,
  axiosGetMyReviews,
} from "../commonFn/api";

export interface dataState {
  content?: {count: number; rows: unknown};
  error: boolean;
  loading: boolean;
}
const axiosObj: {[index: string]: Function} = {
  bookmark: axiosGetMyBookMark,
  review: axiosGetMyReviews,
  post: axiosGetMyPost,
  comment: axiosGetMyComment,
};
const useMypage = (pageType: string) => {
  const [serverData, setServerData] = useState<dataState>({
    loading: true,
    error: false,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const asyncTempFunc = async () => {
      try {
        const content = await axiosObj[pageType](1);
        setServerData({
          content: content.data,
          loading: false,
          error: false,
        });
      } catch (err) {
        setServerData({loading: false, error: true});
      }
    };
    asyncTempFunc();
  }, []);

  const changePage = async (page: number) => {
    try {
      const content = await axiosObj[pageType](page);
      setServerData({
        content: content.data,
        loading: false,
        error: false,
      });
      setPage(page);
    } catch (err) {
      setServerData({loading: false, error: true});
    }
  };

  return {serverData, changePage, page, setServerData};
};

export default useMypage;
