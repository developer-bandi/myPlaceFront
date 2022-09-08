import {act, renderHook, waitFor} from "@testing-library/react";
import axios from "axios";
import {useRouter} from "next/router";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {useLogin} from "./loginCheck";
import useMoveTargetStore from "./moveTargetStore";
import useMypage from "./mypage";

jest.mock("axios");

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const routerMock = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(routerMock);
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("loginCheck Hook 테스트", () => {
  const wrapper = ({children}: any) => (
    <Provider
      store={configureMockStore()({
        userLogin: {loading: false, error: false},
      })}
    >
      {children}
    </Provider>
  );

  window.alert = jest.fn();
  it("로그인 안된 경우", async () => {
    const {result} = renderHook(() => useLogin(), {wrapper});

    expect(window.alert).toBeCalledWith("로그인을 해주세요!");
    expect(routerMock.push).toBeCalledWith("/user/auth/signin");
  });
});

describe("useMoveTargetStore Hook 테스트", () => {
  const storeMock = configureMockStore()({
    userLogin: {loading: false, error: false},
  });
  const wrapper = ({children}: any) => (
    <Provider store={storeMock}>{children}</Provider>
  );
  window.alert = jest.fn();
  it("moveTargetStore 함수 테스트", () => {
    const {result} = renderHook(() => useMoveTargetStore(), {wrapper});
    act(() => {
      result.current.moveTargetStore(
        1,
        "testName",
        "testLatitude",
        "testLongitude",
        "testAddress"
      );
    });
    expect(storeMock.getActions()[0]).toEqual({
      payload: {
        latitude: "testLatitude",
        longitude: "testLongitude",
        searchKeyword: "testName",
      },
      type: "searchResult/searchStore",
    });
    expect(storeMock.getActions()[1]).toEqual({
      payload: 1,
      type: "storeInfo/getStoreInfo",
    });
    expect(storeMock.getActions()[2]).toEqual({
      payload: {
        address: "testAddress",
        latitude: "testLatitude",
        longitude: "testLongitude",
      },
      type: "searchCondition/setPosition",
    });
    expect(storeMock.getActions()[3]).toEqual({
      payload: "testName",
      type: "searchCondition/setKeyword",
    });
    expect(storeMock.getActions()[4]).toEqual({
      payload: "keywordSearch",
      type: "searchType/setSearchType",
    });
    expect(routerMock.push).toBeCalledWith("/findplace");
  });
});

describe("mypage Hook 테스트", () => {
  const wrapper = ({children}: any) => (
    <Provider
      store={configureMockStore()({
        userLogin: {loading: false, error: false},
      })}
    >
      {children}
    </Provider>
  );
  window.alert = jest.fn();
  describe("useEffect 테스트 하는 경우", () => {
    it("정상적으로 받아온 경우", async () => {
      axiosMock.get.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      const {result} = renderHook(() => useMypage("bookmark"), {wrapper});
      await waitFor(() => {
        expect(result.current.serverData).toEqual({
          content: "test",
          loading: false,
          error: false,
        });
      });
    });
    it("에러가 발생한 경우", async () => {
      axiosMock.get.mockImplementation(() =>
        Promise.reject({status: 500, data: "error"})
      );
      const {result} = renderHook(() => useMypage("bookmark"), {wrapper});
      await waitFor(() => {
        expect(result.current.serverData).toEqual({
          loading: false,
          error: true,
        });
      });
    });
  });

  describe("changePage", () => {
    it("정상적으로 받아온 경우", async () => {
      axiosMock.get.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      const {result} = renderHook(() => useMypage("bookmark"), {wrapper});
      await act(async () => {
        await result.current.changePage(2);
      });
      await waitFor(() => {
        expect(result.current.serverData).toEqual({
          content: "test",
          loading: false,
          error: false,
        });
        expect(result.current.page).toBe(2);
      });
    });
    it("에러가 발생한 경우", async () => {
      axiosMock.get.mockImplementation(() =>
        Promise.reject({status: 500, data: "error"})
      );
      const {result} = renderHook(() => useMypage("bookmark"), {wrapper});
      await act(async () => {
        await result.current.changePage(2);
      });
      await waitFor(() => {
        expect(result.current.serverData).toEqual({
          loading: false,
          error: true,
        });
      });
    });
  });
});
