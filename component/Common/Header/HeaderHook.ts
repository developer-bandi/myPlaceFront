import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosGetNotice} from "../../../lib/commonFn/api";
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
  const [isNotice, setIsNotice] = useState(false);
  useEffect(() => {
    const asyncWrapFn = async () => {
      try {
        const axiosNoticeList = await axiosGetNotice();
        if (
          axiosNoticeList.data.filter((data: {check: boolean}) => {
            if (data.check) {
              return false;
            } else {
              return true;
            }
          }).length >= 1
        ) {
          setIsNotice(true);
        } else {
          setIsNotice(false);
        }
      } catch (e) {
        setIsNotice(false);
      }
    };
    asyncWrapFn();
  }, [loginedUser]);

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
    isNotice,
    modalStatus,
  };
};

export default useHeader;
