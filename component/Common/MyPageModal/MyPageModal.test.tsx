import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {Provider} from "react-redux";
import MyPageModal from "./MyPageModal";
import configureMockStore from "redux-mock-store";
import useMyPageModal from "./MyPageModalHook";

describe("MyPageModal Presentational 테스트", () => {
  it("모바일 버전인 경우", () => {
    const userLogoutMockFn = jest.fn();
    const modalActvieChangeMockFn = jest.fn();

    const utils = render(
      <MyPageModal
        userLogout={userLogoutMockFn}
        modalActvieChange={modalActvieChangeMockFn}
        isMobile={true}
      />
    );
    screen.getByTestId("mobile");
    fireEvent.click(screen.getByTestId("userLogout"));
    fireEvent.click(screen.getByTestId("modalActvieChange"));
    fireEvent.click(screen.getByTestId("modalActvieChange0"));
    expect(utils.container).toMatchSnapshot();
    expect(userLogoutMockFn).toBeCalledTimes(1);
    expect(modalActvieChangeMockFn).toBeCalledTimes(2);
  });
  it("모바일 버전이 아닌 경우", () => {
    const utils = render(
      <MyPageModal
        userLogout={jest.fn()}
        modalActvieChange={jest.fn()}
        isMobile={true}
      />
    );
    expect(utils.container).toMatchSnapshot();
  });
});

describe("Header Hook 테스트", () => {
  const mockStore = configureMockStore()({});
  const wrapper = ({children}: any) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  it("userLogout 함수 테스트", () => {
    const {result} = renderHook(() => useMyPageModal(), {wrapper});
    act(() => {
      result.current.userLogout();
    });
    expect(mockStore.getActions()[0]).toEqual({
      payload: undefined,
      type: "userLogin/logout",
    });
  });

  it("modalActvieChange 함수 테스트", () => {
    const {result} = renderHook(() => useMyPageModal(), {wrapper});
    act(() => {
      result.current.modalActvieChange();
    });
    expect(mockStore.getActions()[1]).toEqual({
      payload: undefined,
      type: "mypageModal/setActive",
    });
  });
});
