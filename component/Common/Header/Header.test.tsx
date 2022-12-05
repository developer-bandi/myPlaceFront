import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import useHeader from "./HeaderHook";
import React, { ReactNode } from "react";

describe("Header Hook 테스트", () => {
  const mockStore = configureMockStore()({
    userLogin: {
      loading: false,
      error: false,
    },
    mypageModal: {
      active: false,
    },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  it("로그인 체크하는 useEffect 테스트", () => {
    renderHook(() => useHeader(), { wrapper });
    expect(mockStore.getActions()[0]).toEqual({
      payload: undefined,
      type: "userLogin/checkSignin",
    });
  });

  it("changePageModal 함수 테스트", () => {
    const { result } = renderHook(() => useHeader(), { wrapper });
    act(() => {
      result.current.changePageModal();
    });
    expect(mockStore.getActions()[2]).toEqual({
      payload: undefined,
      type: "modalStatus/setMypage",
    });
    expect(mockStore.getActions()[3]).toEqual({
      payload: false,
      type: "modalStatus/setNotice",
    });
  });
  it("changeNoticeModal 함수 테스트", () => {
    const { result } = renderHook(() => useHeader(), { wrapper });
    act(() => {
      result.current.changeNoticeModal();
    });

    expect(mockStore.getActions()[5]).toEqual({
      payload: undefined,
      type: "modalStatus/setNotice",
    });
    expect(mockStore.getActions()[6]).toEqual({
      payload: false,
      type: "modalStatus/setMypage",
    });
  });
});
