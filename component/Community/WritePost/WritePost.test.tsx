import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import axios from "axios";
import {useRouter} from "next/router";
import React, {ReactNode} from "react";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import WritePost from "./WritePost";
import useWritePost from "./WritePostHook";
jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("writePost Hook test", () => {
  describe("submit 함수 test", () => {
    afterEach(cleanup);
    let loginStatus = false;
    const mockStore = configureMockStore();
    const loginStoreMock = mockStore({
      userLogin: {
        content: {id: 1, nickname: "test"},
        loading: false,
        error: false,
      },
    });
    const logoutStoreMock = configureMockStore()({
      userLogin: {
        loading: false,
        error: false,
      },
    });
    const wrapper = ({children}: {children: ReactNode}) => (
      <Provider store={loginStatus ? loginStoreMock : logoutStoreMock}>
        {children}
      </Provider>
    );

    it("로그인 하지 않은 경우", async () => {
      window.alert = jest.fn();
      jest.spyOn(React, "useRef").mockReturnValueOnce({current: "test"});
      const {result} = renderHook(() => useWritePost(), {
        wrapper,
      });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("로그인을 해주세요!");
    });

    it("정상적으로 업로드 한경우", async () => {
      loginStatus = true;
      window.alert = jest.fn();
      const mockRouter = {
        push: jest.fn(),
      };
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      jest.spyOn(React, "useRef").mockReturnValue({current: "test"});

      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      const {result} = renderHook(() => useWritePost(), {
        wrapper,
      });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("게시글 등록이 완료되었습니다");
      expect(mockRouter.push).toBeCalledWith("/community/postlist");
    });

    it("업로드중 에러가 발생한 경우", async () => {
      window.alert = jest.fn();
      const useRefSpy = jest
        .spyOn(React, "useRef")
        .mockReturnValueOnce({current: "test"});
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({status: 500, data: "에러발생"})
      );
      const {result} = renderHook(() => useWritePost(), {
        wrapper,
        initialProps: {
          login: false,
        },
      });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});

describe("WritePost Presentational Test", () => {
  const addImgMock = jest.fn();
  const deleteImgMock = jest.fn();
  const submitMock = jest.fn();
  const utils = render(
    <WritePost
      addImg={addImgMock}
      deleteImg={deleteImgMock}
      uploadImg={["http://test"]}
      titleRef={{current: null}}
      contentRef={{current: null}}
      submit={submitMock}
    />
  );
  expect(utils.container).toMatchSnapshot();
  fireEvent.click(screen.getByTestId("deleteImg0"));
  fireEvent.change(screen.getByTestId("addImg"), {
    target: {value: ""},
  });
  fireEvent.click(screen.getByTestId("submit"));

  expect(addImgMock).toBeCalledTimes(1);
  expect(deleteImgMock).toBeCalledTimes(1);
  expect(submitMock).toBeCalledTimes(1);
});
