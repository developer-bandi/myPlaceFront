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

  const wrapper = ({children}: any) => (
    <Provider store={configureMockStore()({})}>{children}</Provider>
  );

  describe("상황 테스트", () => {
    it("로그인 했을 경우", () => {
      const modalActvieChangeMockFn = jest.fn();
      const utils = render(
        <Header
          loginedUser={loginMock}
          modalActvieChange={modalActvieChangeMockFn}
          modalActive={false}
          isMobile={true}
        />,
        {wrapper}
      );
      fireEvent.click(screen.getByTestId("modalActvieChange"));
      screen.getByTestId("login");
      expect(utils.container).toMatchSnapshot();
      expect(modalActvieChangeMockFn).toBeCalledTimes(1);
    });

    it("로그인 안했을경우", () => {
      const utils = render(
        <Header
          loginedUser={logoutMock}
          modalActvieChange={jest.fn()}
          modalActive={false}
          isMobile={true}
        />,
        {wrapper}
      );
      screen.getByTestId("logout");
      expect(utils.container).toMatchSnapshot();
    });

    it("로그인 하고 마이페이지 창을 열였을 경우", () => {
      const utils = render(
        <Header
          loginedUser={logoutMock}
          modalActvieChange={jest.fn()}
          modalActive={true}
          isMobile={true}
        />,
        {wrapper}
      );
      screen.getByTestId("mypageModal");
      expect(utils.container).toMatchSnapshot();
    });
  });

  describe("반응형 테스트", () => {
    it("모바일인 경우", () => {
      const utils = render(
        <Header
          loginedUser={logoutMock}
          modalActvieChange={jest.fn()}
          modalActive={false}
          isMobile={true}
        />
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
  const wrapper = ({children}: any) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  it("로그인 체크하는 useEffect 테스트", () => {
    renderHook(() => useHeader(), {wrapper});
    expect(mockStore.getActions()[0]).toEqual({
      payload: undefined,
      type: "userLogin/checkSignin",
    });
  });

  it("modalActvieChange 함수 테스트", () => {
    const {result} = renderHook(() => useHeader(), {wrapper});
    act(() => {
      result.current.modalActvieChange();
    });
    expect(mockStore.getActions()[2]).toEqual({
      payload: undefined,
      type: "mypageModal/setActive",
    });
  });
});
