import UserLoginSlice, {
  checkSignin,
  checkSigninSuccess,
  checkSigninFailure,
  logout,
  logoutSuccess,
  logoutFailure,
} from "./Reducer";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { throwError } from "redux-saga-test-plan/providers";
import { HYDRATE } from "next-redux-wrapper";
import { userLoginSaga, userLogoutSaga } from "./Saga";
import { AxiosResponse } from "axios";
import { checkSigninRes } from "../../../type/auth";
import {
  checkSignin as checkSigninApi,
  logout as logoutApi,
} from "../../../api/auth";
const mockUser = { id: 1, nickname: "test" };

const checkSigninResMock = {
  data: mockUser,
  status: 200,
} as AxiosResponse<checkSigninRes>;

describe("reducer 테스트", () => {
  const initialState = {
    loading: false,
    error: false,
  };
  it("initial state을 설정한 경우", () => {
    expect(UserLoginSlice(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
  it("checkSignin 액션이 발생한 경우", () => {
    expect(UserLoginSlice(initialState, checkSignin())).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it("checkSigninSuccess 액션이 발생한 경우", () => {
    const actual = UserLoginSlice(
      initialState,
      checkSigninSuccess(checkSigninResMock)
    );
    expect(actual.content).toStrictEqual(checkSigninResMock.data);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
  it("checkSigninFailure 액션이 발생한 경우", () => {
    const actual = UserLoginSlice(initialState, checkSigninFailure());
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(true);
  });
  it("logout 액션이 발생한 경우", () => {
    const actual = UserLoginSlice(
      { ...initialState, content: mockUser },
      logout()
    );

    expect(actual.content).toEqual(mockUser);
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(false);
  });
  it("logoutSuccess 액션이 발생한 경우", () => {
    const actual = UserLoginSlice(
      { ...initialState, content: mockUser },
      logoutSuccess()
    );
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
  it("logoutFailure 액션이 발생한 경우", () => {
    const actual = UserLoginSlice(
      { ...initialState, content: mockUser },
      logoutFailure()
    );
    expect(actual.content).toEqual(mockUser);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(true);
  });
  it("HYDRATE 테스트", () => {
    const actual = UserLoginSlice(initialState, { type: HYDRATE });
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
});

describe("saga 테스트", () => {
  describe("userLoginSaga 의도한대로 작동하는지", () => {
    it("api를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(userLoginSaga)
        .provide([[call(checkSigninApi), { data: checkSigninResMock }]])
        .put({
          type: "userLogin/checkSigninSuccess",
          payload: { data: checkSigninResMock },
        })
        .dispatch({
          type: "userLogin/checkSignin",
        })
        .silentRun();
    });
    it("에러가 발생한 경우", () => {
      return expectSaga(userLoginSaga)
        .provide([[call(checkSigninApi), throwError(new Error("Whoops"))]])
        .put({ type: "userLogin/checkSigninFailure", payload: undefined })
        .dispatch({ type: "userLogin/checkSignin" })
        .silentRun();
    });
  });
  describe("userLogoutSaga 의도한대로 작동하는지", () => {
    it("api를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(userLogoutSaga)
        .provide([[call(logoutApi), undefined]])
        .put({ type: "userLogin/logoutSuccess", payload: undefined })
        .dispatch({ type: "userLogin/logout" })
        .silentRun();
    });
    it("에러가 발생한 경우", () => {
      return expectSaga(userLogoutSaga)
        .provide([[call(logoutApi), throwError(new Error("Whoops"))]])
        .put({ type: "userLogin/logoutFailure", payload: undefined })
        .dispatch({ type: "userLogin/logout" })
        .silentRun();
    });
  });
});
