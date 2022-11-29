import { commentListContentRow } from "../MyCommentContainer";
import styles from "./Comment.module.scss";

interface CommentProps {
  content: commentListContentRow;
  movePostDetailPage: (id: number) => void;
}

const Comment = ({ content, movePostDetailPage }: CommentProps) => {
  return (
    <div
      className={styles.mainBlock}
      onClick={() => movePostDetailPage(content.id)}
      key={content.id}
    >
      <div className={styles.topBlock}>
        <div className={styles.user}>{content.nickname}</div>
        <div className={styles.date}>{content.createdAt}</div>
      </div>
      <p className={styles.content}>{content.content}</p>
    </div>
  );
};

export default Comment;
