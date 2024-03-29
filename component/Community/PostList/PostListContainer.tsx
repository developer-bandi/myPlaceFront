import { getPostListRes } from "../../../type/post";
import PostList from "./PostList";
import usePostList from "./PostListHook";
interface PostListContainerProps {
  serverSideData: getPostListRes;
}
const PostListContainer = ({ serverSideData }: PostListContainerProps) => {
  const {
    page,
    postList,
    changeSort,
    changePage,
    selectedSort,
    searchRef,
    searchPost,
    initializeSearch,
    moveWritePage,
    movePostDetailPage,
  } = usePostList(serverSideData);
  console.log(postList);
  return (
    <PostList
      page={page}
      postList={postList}
      changeSort={changeSort}
      changePage={changePage}
      selectedSort={selectedSort}
      searchRef={searchRef}
      searchPost={searchPost}
      initializeSearch={initializeSearch}
      moveWritePage={moveWritePage}
      movePostDetailPage={movePostDetailPage}
    />
  );
};

export default PostListContainer;
