import Comments from "./Comments";
import useComments from "./CommentsHook";

const CommentsContainer = () => {
  const comments = useComments();

  return <Comments comments={comments} />;
};

export default CommentsContainer;
