import { useSelector } from "react-redux";
import { RootReducer } from "../../../../store";
import { postDetail } from "../../../../type/post";

const usePost = () => {
  const { Photos, content } = useSelector(
    (state: RootReducer) => state.postDetail.content as postDetail
  );

  return { images: Photos, content };
};

export default usePost;
