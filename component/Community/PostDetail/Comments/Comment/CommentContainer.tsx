import { setDateLatest } from "../../../../../lib/date";
import Comment from "./Comment";
import useComment from "./CommentHook";

interface CommentContainerProps {
  id: number;
  nickname: string;
  date: string;
  userId: number;
  content: string;
}

const CommentContainer = ({ ...props }: CommentContainerProps) => {
  const { dispatchDeleteComment, isMyComment } = useComment();

  return (
    <Comment
      {...props}
      date={setDateLatest(props.date)}
      dispatchDeleteComment={dispatchDeleteComment}
      isMyComment={isMyComment(props.userId)}
    />
  );
};

export default CommentContainer;
