import { useSelector } from "react-redux";
import { postDetailCommentType } from "../../../../lib/apitype/post";
import { RootReducer } from "../../../../store";

const useComments = () => {
  return useSelector(
    (state: RootReducer) => state.postDetail.content?.Comments
  ) as postDetailCommentType[];
};

export default useComments;
