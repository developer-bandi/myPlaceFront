import Post from "./Post";
import usePost from "./PostHook";

const PostContainer = () => {
  const { ...props } = usePost();

  return <Post {...props} />;
};

export default PostContainer;
