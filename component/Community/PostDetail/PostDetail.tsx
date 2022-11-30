import styles from "./PostDetail.module.scss";
import CommentInputContainer from "./CommentInput/CommentInputContainer";
import CommentsContainer from "./Comments/CommentsContainer";
import PostContainer from "./Post/PostContainer";

const PostDetail = () => {
  return (
    <main className={styles.mainBlock}>
      <PostContainer />
      <CommentsContainer />
      <CommentInputContainer />
    </main>
  );
};

export default PostDetail;
