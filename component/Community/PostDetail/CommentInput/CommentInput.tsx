import { RefObject } from "react";
import styles from "./CommentInput.module.scss";

interface CommentInputProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  dispatchPostComment: () => void;
}

const CommentInput = ({
  textareaRef,
  dispatchPostComment,
}: CommentInputProps) => {
  return (
    <div className={styles.mainBlock}>
      <textarea
        className={styles.input}
        ref={textareaRef}
        aria-label="commentTextarea"
      />
      <button className={styles.button} onClick={dispatchPostComment}>
        등록
      </button>
    </div>
  );
};

export default CommentInput;
