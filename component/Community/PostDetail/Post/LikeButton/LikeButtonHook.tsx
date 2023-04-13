import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../../../store";
import { updateLikeCount } from "../../../../../store/reducers/postDetail/Reducer";
import { getPostDetailRes } from "../../../../../type/post";

const useLikeButton = () => {
  const loginedId = useSelector(
    (state: RootReducer) => state.userLogin.content?.id
  );
  const postDetail = useSelector(
    (state: RootReducer) => state.postDetail.content as getPostDetailRes
  );
  const { serverLike } = useSelector((state: RootReducer) => state.postDetail);
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
          serverLike: serverLike as number[],
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
