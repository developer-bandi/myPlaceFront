import { useSelector } from "react-redux";
import { postDetailType } from "../../../../lib/apitype/post";
import { RootReducer } from "../../../../store";

const usePost = () => {
  const { Photos, content } = useSelector(
    (state: RootReducer) => state.postDetail.content as postDetailType
  );

  return { images: Photos, content };
};

export default usePost;
