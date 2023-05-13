import { BiCommentDetail } from "react-icons/bi";
import { comment } from "../../../../type/post";
import CommentContainer from "./Comment/CommentContainer";
import styles from "./Comments.module.scss";

const Comments = ({ comments }: { comments: comment[] }) => {
  return (
    <div>
      <div className={styles.titleBlock}>
        <BiCommentDetail className={styles.icon} />
        댓글 {comments.length}개
      </div>
      <div className={styles.listBlock}>
        {comments.map(
          ({
            id,
            User: { id: userId, nickname },
            createdAt: date,
            content,
          }) => {
            return (
              <CommentContainer
                id={id}
                userId={userId}
                nickname={nickname}
                date={date}
                content={content}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Comments;
