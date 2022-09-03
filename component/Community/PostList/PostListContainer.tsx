import PostList from "./PostList";
import usePostList from "./PostListHook";

const PostListContainer = () => {
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
  } = usePostList();

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
