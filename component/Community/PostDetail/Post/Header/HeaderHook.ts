import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postDetailType } from "../../../../../lib/apitype/post";
import { setDateLatest } from "../../../../../lib/commonFn/date";
import { RootReducer } from "../../../../../store";
import { deletePost } from "../../../../../store/reducers/postDetail/Reducer";

const useHeader = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const {
    id,
    title,
    User: { nickname },
    UserId,
    createdAt: date,
    viewCount,
  } = useSelector(
    (state: RootReducer) => state.postDetail.content as postDetailType
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const dispatchDeletePost = ({
    postId,
    userId,
  }: {
    postId: string;
    userId: number;
  }) => {
    if (window.confirm("포스트를 삭제하시겠습니까?")) {
      dispatch(deletePost({ postId, userId, router }));
    }
  };

  const isMyPost = () => loginedUser.content?.id === UserId;

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
