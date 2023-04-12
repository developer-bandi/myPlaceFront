import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import newReact from "react";
import * as React from "react";
import { useRouter } from "next/router";
import useSigninForm from "./SigninFormHook";
const CryptoJS = require("crypto-js");

let status = {
  post: 202,
};
jest.mock("axios", () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      post: jest.fn(() => {
        if (status.post === 202) {
          return Promise.resolve({
            status: 202,
            data: "비밀번호 혹은 아이디를 잘못입력하였습니다",
          });
        }
        if (status.post === 200) {
          return Promise.resolve({
            status: 200,
            data: "로그인 성공",
          });
        }
        if (status.post === 500) {
          return Promise.reject({
            status: 500,
            data: "에러 발생",
          });
        }
      }),
    }),
  };
});

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

jest.spyOn(CryptoJS.AES, "encrypt").mockReturnValue({ toString: () => "test" });

describe("SigninForm Hook 테스트", () => {
  describe("checkLogin 함수 테스트", () => {
    it("잘못된 아이디 혹은 비밀번호를 입력한경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });

      const { result } = renderHook(() => useSigninForm());
      await act(async () => {
        await result.current.checkLogin({ type: "click" });
      });
      expect(alertMock.mock.calls[0][0]).toBe(
        "비밀번호 혹은 아이디를 잘못입력하였습니다"
      );
    });
    it("로그인에 성공한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      status.post = 200;
      const { result } = renderHook(() => useSigninForm());
      await act(async () => {
        await result.current.checkLogin({ type: "click" });
      });
      expect(alertMock.mock.calls[1][0]).toBe("로그인에 성공하였습니다!");
      expect(mockRouter.push).toBeCalledWith("/");
    });
    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      status.post = 500;
      const { result } = renderHook(() => useSigninForm());
      await act(async () => {
        await result.current.checkLogin({ type: "click" });
      });
      expect(alertMock.mock.calls[2][0]).toBe("서버에 에러가 발생하였습니다");
    });
  });
});
