import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {axiosGetNotice, axiosUpdateNotice} from "../../../lib/commonFn/api";
import {setNotice} from "../../../store/reducers/modalStatus/Reducer";
import Notion from "./Notice";

export interface noticeListContent {
  id: number;
  content: string;
  check: boolean;
  createdAt: string;
  updatedAt: string;
  PostId: number;
  UserId: number;
}

export interface noticeListState {
  content?: noticeListContent[];
  loading: boolean;
  error: boolean;
}

const NoticeContainer = () => {
  const [noticeList, setNoticeList] = useState<noticeListState>({
    loading: true,
    error: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosNoticeList = await axiosGetNotice();
        setNoticeList({
          content: axiosNoticeList.data,
          loading: false,
          error: false,
        });
      } catch (e) {
        setNoticeList({
          loading: false,
          error: true,
        });
      }
    };
    asyncWrapFn();
  }, []);
  const checkNotice = async (noticeId: number, postId: number) => {
    try {
      await axiosUpdateNotice(noticeId);
      router.push(`/community/postdetail/${postId}`);
      dispatch(setNotice());
    } catch (error) {
      alert("에러가 발생하였습니다");
    }
  };

  const movePost = (postId: number) => {
    router.push(`/community/postdetail/${postId}`);
    dispatch(setNotice());
  };

  return (
    <Notion
      noticeList={noticeList}
      checkNotice={checkNotice}
      movePost={movePost}
    />
  );
};

export default NoticeContainer;
