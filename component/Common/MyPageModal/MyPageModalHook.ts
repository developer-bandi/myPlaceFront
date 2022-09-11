import {useDispatch} from "react-redux";
import {setMypage} from "../../../store/reducers/modalStatus/Reducer";
import {logout} from "../../../store/reducers/userLogin/Reducer";

const useMyPageModal = () => {
  const dispatch = useDispatch();
  const userLogout = () => {
    dispatch(logout());
    dispatch(setMypage());
  };
  const modalActvieChange = () => {
    dispatch(setMypage());
  };

  return {
    userLogout,
    modalActvieChange,
  };
};

export default useMyPageModal;
