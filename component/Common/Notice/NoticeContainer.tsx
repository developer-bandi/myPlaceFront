import { getNoticeList } from "../../../api/auth";
import useGetServerData from "../../../hooks/getData";
import Notion from "./Notice";
import useNotice from "./NoticeHook";

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
  const { serverData } = useGetServerData(getNoticeList);
  const { checkNotice, movePost } = useNotice();

  return (
    <Notion
      serverData={serverData as noticeListState}
      checkNotice={checkNotice}
      movePost={movePost}
    />
  );
};

export default NoticeContainer;
