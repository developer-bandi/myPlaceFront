import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../../../store";
import { deleteComment } from "../../../../../store/reducers/postDetail/Reducer";

const useComment = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const dispatch = useDispatch();

  const dispatchDeleteComment = ({
    commentId,
    userId,
  }: {
    commentId: number;
    userId: number;
  }) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(deleteComment({ commentId, userId }));
    }
  };

  const isMyComment = (commentId: number) => {
    return loginedUser.content?.id === commentId;
  };

  return { dispatchDeleteComment, isMyComment };
};

export default useComment;
