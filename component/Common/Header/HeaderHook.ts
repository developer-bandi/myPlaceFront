import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {
  setMypage,
  setNotice,
} from "../../../store/reducers/modalStatus/Reducer";
import {checkSignin} from "../../../store/reducers/userLogin/Reducer";

const useHeader = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const modalStatus = useSelector((state: RootReducer) => state.modalStatus);
  const dispatch = useDispatch();

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
  return {
    loginedUser,
    changePageModal,
    changeNoticeModal,
    modalStatus,
  };
};

export default useHeader;
