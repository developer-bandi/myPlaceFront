import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import {
  checkSignin,
  logout,
} from "../../../store/reducers/userLogin/userLoginReducer";
import Header from "./Header";

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  useEffect(() => {
    if (!loginedUser.loginStatus) {
      dispatch(checkSignin());
    }
  }, []);

  const userLogout = () => {
    dispatch(logout());
  };

  return <Header loginedUser={loginedUser} userLogout={userLogout} />;
};

export default React.memo(HeaderContainer);
