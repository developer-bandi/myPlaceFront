import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postDetailType } from "../../../../../lib/apitype/post";
import { RootReducer } from "../../../../../store";
import { updateLikeCount } from "../../../../../store/reducers/postDetail/Reducer";

const useLikeButton = () => {
  const loginedId = useSelector(
    (state: RootReducer) => state.userLogin.content?.id
  );
  const postDetail = useSelector(
    (state: RootReducer) => state.postDetail.content as postDetailType
  );
  const dispatch = useDispatch();

  const checkLike = () => {
    if (loginedId === undefined) return "noLogin";
    if (postDetail.likelist.indexOf(loginedId) !== -1) return "up";
    return "down";
  };

  const dispatchUpdateLike = () => {
    if (loginedId === undefined) {
      alert("로그인을 진행해 주세요");
    } else {
      dispatch(
        updateLikeCount({
          postId: postDetail.id,
          userId: loginedId,
          type: checkLike(),
        })
      );
    }
  };

  return {
    dispatchUpdateLike,
    checkLike,
    likedLength: postDetail.likelist.length,
  };
};

export default useLikeButton;
