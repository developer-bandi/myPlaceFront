import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {setActive} from "../../../store/reducers/mypageModal/Reducer";
import {checkSignin} from "../../../store/reducers/userLogin/Reducer";

const useHeader = () => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const modalActive = useSelector(
    (state: RootReducer) => state.mypageModal.active
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginedUser.content === undefined) {
      dispatch(checkSignin());
    }
  }, []);

  const modalActvieChange = () => {
    dispatch(setActive());
  };
  return {
    loginedUser,
    modalActvieChange,
    modalActive,
  };
};

export default useHeader;
