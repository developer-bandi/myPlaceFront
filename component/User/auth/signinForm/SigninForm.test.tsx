import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import axios from "axios";
import newReact from "react";
import * as React from "react";
import {useRouter} from "next/router";
import useSigninForm from "./SigninFormHook";
import SignInForm from "./SigninForm";
const CryptoJS = require("crypto-js");

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

jest.spyOn(CryptoJS.AES, "encrypt").mockReturnValue({toString: () => "test"});

describe("SigninForm Presentational 테스트", () => {
  it("정상 출력", () => {
    const checkLoginMock = jest.fn();
    const utils = render(
      <SignInForm
        checkLogin={checkLoginMock}
        idInputRef={{current: null}}
        passwordInputRef={{current: null}}
      />
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("checklogin"));
    expect(checkLoginMock).toBeCalled();
  });
});

describe("SigninForm Hook 테스트", () => {
  describe("checkLogin 함수 테스트", () => {
    it("잘못된 아이디 혹은 비밀번호를 입력한경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({
          status: 202,
          data: "비밀번호 혹은 아이디를 잘못입력하였습니다",
        })
      );
      const {result} = renderHook(() => useSigninForm());
      await act(async () => {
        await result.current.checkLogin();
      });
      expect(alertMock.mock.calls[0][0]).toBe(
        "비밀번호 혹은 아이디를 잘못입력하였습니다"
      );
    });
    it("로그인에 성공한 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "로그인 성공",
        })
      );
      const {result} = renderHook(() => useSigninForm());
      await act(async () => {
        await result.current.checkLogin();
      });
      expect(alertMock.mock.calls[1][0]).toBe("로그인에 성공하였습니다!");
      expect(mockRouter.push).toBeCalledWith("/");
    });
    it("에러가 발생한 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "에러 발생",
        })
      );
      const {result} = renderHook(() => useSigninForm());
      await act(async () => {
        await result.current.checkLogin();
      });
      expect(alertMock.mock.calls[2][0]).toBe("서버에 에러가 발생하였습니다");
    });
  });
});
