import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {Provider} from "react-redux";
import Header from "./Header";
import configureMockStore from "redux-mock-store";
import useHeader from "./HeaderHook";
import React, {ReactNode} from "react";

describe("Header Presentational 테스트", () => {
  const loginMock = {
    content: {id: 1, nickname: "test"},
    loading: false,
    error: false,
  };

  const logoutMock = {
    loading: false,
    error: false,
  };

  const wrapper = ({children}: {children: ReactNode}) => (
    <Provider store={configureMockStore()({})}>{children}</Provider>
  );

  describe("상황 테스트", () => {
    it("로그인 했을 경우", () => {
      const changePageModalMock = jest.fn();
      const changeNoticeModalMock = jest.fn();
      const utils = render(
        <Header
          loginedUser={loginMock}
          changePageModal={changePageModalMock}
          changeNoticeModal={changeNoticeModalMock}
          serverData={{
            content: [
              {
                id: 1,
                content: "testContent",
                check: true,
                createdAt: "testCreatedAt",
                updatedAt: "testUpdatedAt",
                PostId: 1,
                UserId: 1,
              },
            ],
            loading: true,
            error: false,
          }}
          modalStatus={{
            mypage: false,
            notice: false,
          }}
          isMobile={false}
        />,
        {wrapper}
      );
      fireEvent.click(screen.getByTestId("changePageModal"));
      fireEvent.click(screen.getByTestId("changeNoticeModal"));
      expect(utils.container).toMatchSnapshot();
      expect(changePageModalMock).toBeCalledTimes(1);
      expect(changeNoticeModalMock).toBeCalledTimes(1);
    });

    it("로그인 안했을경우", () => {
      const utils = render(
        <Header
          loginedUser={logoutMock}
          changePageModal={jest.fn()}
          changeNoticeModal={jest.fn()}
          serverData={{loading: true, error: false}}
          modalStatus={{
            mypage: false,
            notice: false,
          }}
          isMobile={false}
        />,
        {wrapper}
      );
      screen.getByTestId("logout");
      expect(utils.container).toMatchSnapshot();
    });

    it("로그인 하고 마이페이지 창을 열였을 경우", () => {
      const utils = render(
        <Header
          loginedUser={loginMock}
          changePageModal={jest.fn()}
          changeNoticeModal={jest.fn()}
          serverData={{loading: true, error: false}}
          modalStatus={{
            mypage: true,
            notice: false,
          }}
          isMobile={false}
        />,
        {wrapper}
      );
      expect(utils.container).toMatchSnapshot();
    });
  });

  it("로그인 하고 알림창을 열었을 경우", () => {
    const utils = render(
      <Header
        loginedUser={loginMock}
        changePageModal={jest.fn()}
        changeNoticeModal={jest.fn()}
        serverData={{loading: true, error: false}}
        modalStatus={{
          mypage: false,
          notice: true,
        }}
        isMobile={false}
      />,
      {wrapper}
    );
    expect(utils.container).toMatchSnapshot();
  });

  describe("반응형 테스트", () => {
    it("모바일인 경우", () => {
      const utils = render(
        <Header
          loginedUser={logoutMock}
          changePageModal={jest.fn()}
          changeNoticeModal={jest.fn()}
          serverData={{loading: true, error: false}}
          modalStatus={{
            mypage: false,
            notice: true,
          }}
          isMobile={true}
        />,
        {wrapper}
      );
      screen.getByTestId("mobile");
      expect(utils.container).toMatchSnapshot();
    });
  });
});

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
  const wrapper = ({children}: {children: ReactNode}) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  it("로그인 체크하는 useEffect 테스트", () => {
    renderHook(() => useHeader(), {wrapper});
    expect(mockStore.getActions()[0]).toEqual({
      payload: undefined,
      type: "userLogin/checkSignin",
    });
  });

  it("changePageModal 함수 테스트", () => {
    const {result} = renderHook(() => useHeader(), {wrapper});
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
    const {result} = renderHook(() => useHeader(), {wrapper});
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
