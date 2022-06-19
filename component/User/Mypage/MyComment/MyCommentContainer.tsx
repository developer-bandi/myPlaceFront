import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosGetMyComment } from "../../../../lib/commonFn/api";
import MyComment from "./MyComment";

export interface commentContent {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  PostId: number;
  UserId: number;
  Post: {
    id: number;
  };
}

const MyCommentContainer = () => {
  const [commentList, setCommentList] = useState<{
    content?: commentContent[];
    loading: boolean;
    error: boolean;
  }>({ loading: true, error: false });
  const router = useRouter();

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosComment = await axiosGetMyComment();
        setCommentList({
          content: axiosComment.data,
          loading: false,
          error: false,
        });
      } catch (error) {
        setCommentList({ loading: false, error: true });
      }
    };
    asyncWrapFn();
  }, []);

  const movePostDetailPage = (id: number) => {
    router.push(`/community/postdetail/${id}`);
  };

  return (
    <MyComment
      commentList={commentList}
      movePostDetailPage={movePostDetailPage}
    />
  );
};

export default MyCommentContainer;
