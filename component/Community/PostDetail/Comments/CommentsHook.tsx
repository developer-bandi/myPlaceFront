import { useSelector } from "react-redux";
import { RootReducer } from "../../../../store";
import { comment } from "../../../../type/post";

const useComments = () => {
  return useSelector(
    (state: RootReducer) => state.postDetail.content?.Comments
  ) as comment[];
};

export default useComments;
