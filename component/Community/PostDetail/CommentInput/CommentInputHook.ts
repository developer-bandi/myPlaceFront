import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useIsNotLogin } from "../../../../lib/customHook/useInNotLogin";
import { RootReducer } from "../../../../store";
import { postComment } from "../../../../store/reducers/postDetail/Reducer";

const useCommentInput = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const postId = useSelector(
    (state: RootReducer) => state.postDetail.content?.id
  ) as string;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { nextAction } = useIsNotLogin();
  const dispatch = useDispatch();

  const dispatchPostComment = () => {
    if (textareaRef.current !== null && loginedUser.content) {
      dispatch(postComment({ id: postId, content: textareaRef.current.value }));
      textareaRef.current.value = "";
    } else {
      nextAction();
    }
  };

  return { dispatchPostComment, textareaRef };
};

export default useCommentInput;
