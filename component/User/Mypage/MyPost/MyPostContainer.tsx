import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosGetMyPost } from "../../../../lib/commonFn/api";
import PostList from "./MyPost";

export interface postListcontent {
  id: number;
  title: string;
  content: string;
  viewCount: string;
  likeCount: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  postlikecount: string[];
  Comments: string[];
}

const MyPostContainer = () => {
  const [postList, setPostList] = useState<{
    content?: postListcontent[];
    loading: boolean;
    error: boolean;
  }>({ loading: true, error: false });
  const router = useRouter();

  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosPostList = await axiosGetMyPost();
        setPostList({
          content: axiosPostList.data,
          loading: false,
          error: false,
        });
      } catch (error) {
        setPostList({ loading: false, error: true });
      }
    };
    asyncWrapFn();
  }, []);

  const movePostDetailPage = (id: number) => {
    router.push(`/community/postdetail/${id}`);
  };

  return (
    <PostList postList={postList} movePostDetailPage={movePostDetailPage} />
  );
};

export default MyPostContainer;
