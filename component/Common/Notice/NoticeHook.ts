import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {axiosUpdateNotice} from "../../../lib/commonFn/api";
import {setNotice} from "../../../store/reducers/modalStatus/Reducer";

const useNotice = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const checkNotice = async (noticeId: number, postId: number) => {
    try {
      await axiosUpdateNotice(noticeId);
      router.push(`/community/postdetail/${postId}`);
      dispatch(setNotice());
    } catch (error) {
      alert("에러가 발생하였습니다");
    }
  };

  const movePost = (postId: number) => {
    router.push(`/community/postdetail/${postId}`);
    dispatch(setNotice());
  };
  return {checkNotice, movePost};
};

export default useNotice;
