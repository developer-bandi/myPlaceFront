import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import useMyPageModal from "./MyPageModalHook";
import { ReactNode } from "react";

describe("MyPageModal Hook 테스트", () => {
  const mockStore = configureMockStore()({});
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  it("userLogout 함수 테스트", () => {
    const { result } = renderHook(() => useMyPageModal(), { wrapper });
    act(() => {
      result.current.userLogout();
    });
    expect(mockStore.getActions()[0]).toEqual({
      payload: undefined,
      type: "userLogin/logout",
    });
  });

  it("modalActvieChange 함수 테스트", () => {
    const { result } = renderHook(() => useMyPageModal(), { wrapper });
    act(() => {
      result.current.modalActvieChange();
    });
    expect(mockStore.getActions()[1]).toEqual({
      payload: undefined,
      type: "modalStatus/setMypage",
    });
  });
});
