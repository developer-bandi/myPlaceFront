import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDateLatest } from "../../../../../lib/date";
import { RootReducer } from "../../../../../store";
import { deletePost } from "../../../../../store/reducers/postDetail/Reducer";
import { getPostDetailRes } from "../../../../../type/post";

const useHeader = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const {
    id,
    title,
    User: { nickname, id: userId },
    createdAt: date,
    viewCount,
  } = useSelector(
    (state: RootReducer) => state.postDetail.content as getPostDetailRes
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const dispatchDeletePost = ({
    postId,
    userId,
  }: {
    postId: number;
    userId: number;
  }) => {
    if (window.confirm("포스트를 삭제하시겠습니까?")) {
      dispatch(deletePost({ postId, userId, router }));
    }
  };

  const isMyPost = () => loginedUser.content?.id === userId;

  return {
    dispatchDeletePost,
    isMyPost,
    id,
    title,
    nickname,
    date: setDateLatest(date),
    viewCount,
    userId: loginedUser.content?.id,
  };
};

export default useHeader;
