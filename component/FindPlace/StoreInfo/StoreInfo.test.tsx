import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import axios from "axios";
import {useRouter} from "next/router";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import StoreInfo from "./StoreInfo";
import useStoreInfo from "./StoreInfoHook";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

const alertMock = jest.fn();
window.alert = alertMock;

describe("StoreInfo Presentational 테스트", () => {
  const storeInfoMock = {
    storeInfo: {
      id: 1,
      name: "testName",
      tel: "testTel",
      openingHours: "testOpeningHour",
      address: "testAddress",
      category: "testCategory",
      updatedAt: new Date(),
      latitude: "testLatitude",
      longitude: "testLongitude",
    },
  };
  it("스토어가 렌더링되지 않은 경우", () => {
    const utils = render(
      <StoreInfo
        store={{loading: false, error: false}}
        postBookMark={jest.fn()}
        deleteBookMark={jest.fn()}
        deleteStoreTab={jest.fn()}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
        isMobile={false}
      />
    );

    expect(utils.container).toMatchSnapshot();
  });
  it("스토어가 로딩중인 경우", () => {
    const utils = render(
      <StoreInfo
        store={{loading: true, error: false}}
        postBookMark={jest.fn()}
        deleteBookMark={jest.fn()}
        deleteStoreTab={jest.fn()}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
        isMobile={false}
      />
    );
    screen.getByTestId("loading");
    expect(utils.container).toMatchSnapshot();
  });
  it("에러가 발생한 경우", () => {
    const utils = render(
      <StoreInfo
        store={{loading: false, error: true}}
        postBookMark={jest.fn()}
        deleteBookMark={jest.fn()}
        deleteStoreTab={jest.fn()}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
        isMobile={false}
      />
    );
    screen.getByTestId("error");
    expect(utils.container).toMatchSnapshot();
  });
  it("정상적으로 출력하는 경우", () => {
    const postBookMarkMock = jest.fn();
    const deleteBookMarkMock = jest.fn();
    const utils = render(
      <StoreInfo
        store={{content: storeInfoMock, loading: false, error: false}}
        postBookMark={postBookMarkMock}
        deleteBookMark={jest.fn()}
        deleteStoreTab={deleteBookMarkMock}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
        isMobile={true}
      />
    );
    screen.getByTestId("result");
    fireEvent.click(screen.getByTestId("postBookMark"));
    fireEvent.click(screen.getByTestId("deleteStoreTab"));
    expect(utils.container).toMatchSnapshot();
    expect(postBookMarkMock).toBeCalledTimes(1);
    expect(deleteBookMarkMock).toBeCalledTimes(1);
  });
});

describe("StoreInfo Hook 테스트", () => {
  let login = false;
  const mockStore = configureMockStore();
  const notLoginMockStore = mockStore({
    userLogin: {},
    storeInfo: {},
    modalStatus: {mobile: {searchStoreInfo: true}},
  });
  const loginMockStore = configureMockStore()({
    userLogin: {content: {id: 1, nickname: "testNickname"}},
    storeInfo: {},
    modalStatus: {mobile: {searchStoreInfo: true}},
  });
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <Provider store={login ? loginMockStore : notLoginMockStore}>
      {children}
    </Provider>
  );
  describe("postBookMark함수 테스트", () => {
    it("로그인 하지 않은 경우", async () => {
      const {result} = renderHook(() => useStoreInfo(), {wrapper});
      await act(async () => {
        result.current.postBookMark(111111);
      });
      expect(alertMock.mock.calls[0][0]).toBe("로그인을 해주세요");
    });
    it("정상적으로 반영된 경우", async () => {
      login = true;
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      const {result} = renderHook(() => useStoreInfo(), {wrapper});
      await act(async () => {
        result.current.postBookMark(111111);
      });
      expect(loginMockStore.getActions()[0]).toEqual({
        payload: true,
        type: "storeInfo/setBookmark",
      });
    });
    it("에러가 발생한 경우", async () => {
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({status: 500, data: "error"})
      );
      const {result} = renderHook(() => useStoreInfo(), {wrapper});
      await act(async () => {
        result.current.postBookMark(111111);
      });
      expect(alertMock.mock.calls[1][0]).toBe("에러가 발생하였습니다");
    });
  });

  describe("deleteBookMark함수 테스트", () => {
    it("로그인 하지 않은 경우", async () => {
      login = false;
      const {result} = renderHook(() => useStoreInfo(), {wrapper});
      await act(async () => {
        result.current.deleteBookMark(111111);
      });
      expect(alertMock.mock.calls[2][0]).toBe("로그인을 해주세요");
    });
    it("정상적으로 반영된 경우", async () => {
      login = true;
      mockedAxios.delete.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      const {result} = renderHook(() => useStoreInfo(), {wrapper});
      await act(async () => {
        result.current.deleteBookMark(111111);
      });
      expect(loginMockStore.getActions()[1]).toEqual({
        payload: false,
        type: "storeInfo/setBookmark",
      });
    });
    it("에러가 발생한 경우", async () => {
      mockedAxios.delete.mockImplementation(() =>
        Promise.reject({status: 500, data: "error"})
      );
      const {result} = renderHook(() => useStoreInfo(), {wrapper});
      await act(async () => {
        result.current.deleteBookMark(111111);
      });
      expect(alertMock.mock.calls[3][0]).toBe("에러가 발생하였습니다");
    });
  });
  it("deleteStoreTab 함수 테스트", () => {
    const {result} = renderHook(() => useStoreInfo(), {wrapper});
    act(() => {
      result.current.deleteStoreTab();
    });
    expect(loginMockStore.getActions()[2]).toEqual({
      payload: undefined,
      type: "storeInfo/initializeStoreInfo",
    });
  });
});
