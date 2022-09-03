import {useDispatch} from "react-redux";

import {setActive} from "../../../store/reducers/mypageModal/Reducer";
import {logout} from "../../../store/reducers/userLogin/Reducer";

const useMyPageModal = () => {
  const dispatch = useDispatch();
  const userLogout = () => {
    dispatch(logout());
    dispatch(setActive());
  };
  const modalActvieChange = () => {
    dispatch(setActive());
  };

  return {
    userLogout,
    modalActvieChange,
  };
};

export default useMyPageModal;
