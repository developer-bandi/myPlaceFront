import {postDetailType} from "../../../lib/apitype/post";
import PostDetail from "./PostDetail";
import usePostDetail from "./PostDetailHook";

interface PostDetailContainerProps {
  serverSideData: postDetailType;
}

const PostDetailContainer = ({serverSideData}: PostDetailContainerProps) => {
  const {
    textareaRef,
    comments,
    likelist,
    loginedUser,
    postComment,
    deleteOrPostLikecount,
    deleteComment,
    deletePost,
  } = usePostDetail(serverSideData);

  return (
    <PostDetail
      serverSideData={serverSideData}
      textareaRef={textareaRef}
      comments={comments}
      likelist={likelist}
      loginedUser={loginedUser}
      postComment={postComment}
      deleteOrPostLikecount={deleteOrPostLikecount}
      deleteComment={deleteComment}
      deletePost={deletePost}
    />
  );
};

export default PostDetailContainer;
