import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import {
  setMypage,
  setNotice,
} from "../../../store/reducers/modalStatus/Reducer";
import { checkSignin } from "../../../store/reducers/userLogin/Reducer";

const useHeader = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const modalStatus = useSelector((state: RootReducer) => state.modalStatus);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (loginedUser.content === undefined) {
      dispatch(checkSignin());
    }
  }, []);

  const changePageModal = () => {
    dispatch(setMypage());
    dispatch(setNotice(false));
  };

  const changeNoticeModal = () => {
    dispatch(setNotice());
    dispatch(setMypage(false));
  };

  const moveContributePage = () => {
    if (!loginedUser.loading && loginedUser.content === undefined) {
      alert("로그인해주세요!");
      router.push("/user/auth/signin");
    } else {
      router.push("/contribute");
    }
  };

  return {
    loginedUser,
    changePageModal,
    changeNoticeModal,
    modalStatus,
    moveContributePage,
  };
};

export default useHeader;
