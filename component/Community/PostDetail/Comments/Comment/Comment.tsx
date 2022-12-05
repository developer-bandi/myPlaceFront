import styles from "./Comment.module.scss";

interface CommentProps {
  id: number;
  nickname: string;
  date: string;
  userId: number;
  content: string;
  dispatchDeleteComment: ({
    commentId,
    userId,
  }: {
    commentId: number;
    userId: number;
  }) => void;
  isMyComment: boolean;
}

const Comment = ({
  id,
  nickname,
  date,
  isMyComment,
  userId,
  content,
  dispatchDeleteComment,
}: CommentProps) => {
  return (
    <div className={styles.mainBlock} key={id}>
      <ul className={styles.topBlock}>
        <li className={styles.nickname}>{nickname}</li>
        <li className={styles.date}>{date}</li>
        {isMyComment && (
          <button
            className={styles.button}
            onClick={() => dispatchDeleteComment({ commentId: id, userId })}
          >
            삭제
          </button>
        )}
      </ul>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default Comment;
