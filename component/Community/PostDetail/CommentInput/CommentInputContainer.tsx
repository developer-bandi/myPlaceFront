import CommentInput from "./CommentInput";
import useCommentInput from "./CommentInputHook";

const CommentInputContainer = () => {
  const { dispatchPostComment, textareaRef } = useCommentInput();

  return (
    <CommentInput
      dispatchPostComment={dispatchPostComment}
      textareaRef={textareaRef}
    ></CommentInput>
  );
};

export default CommentInputContainer;
