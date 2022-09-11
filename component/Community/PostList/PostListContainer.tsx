import PostList from "./PostList";
import usePostList, {postListContent} from "./PostListHook";
interface PostListContainerProps {
  serverSideData: postListContent;
}
const PostListContainer = ({serverSideData}: PostListContainerProps) => {
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
