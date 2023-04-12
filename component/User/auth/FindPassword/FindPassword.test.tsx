import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import newReact from "react";
import * as React from "react";
import { useRouter } from "next/router";
import useFindPassword from "./FindPasswordHook";
const CryptoJS = require("crypto-js");

let status = {
  post: 203,
};
jest.mock("axios", () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      post: jest.fn(() => {
        if (status.post === 203) {
          return Promise.resolve({
            status: 203,
            data: "이메일이 존재하지 않습니다",
          });
        }
        if (status.post === 200) {
          return Promise.resolve({
            status: 200,
            data: { id: "testId", number: "testNumber" },
          });
        }
        if (status.post === 2001) {
          return Promise.resolve({
            status: 200,
            data: { id: "testId", number: "testNumber" },
          });
        }
        if (status.post === 500) {
          return Promise.reject({
            status: 500,
            data: "error",
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

describe("FindPassword Hook 테스트", () => {
  describe("sendMail 함수 테스트", () => {
    it("이메일이 존재하지 않는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      const { result } = renderHook(() => useFindPassword());
      await act(async () => {
        await result.current.sendMail({ type: "click" });
      });
      expect(alertMock.mock.calls[0][0]).toBe("이메일이 존재하지 않습니다");
    });

    it("정상적으로 메일을 발송한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      status.post = 200;
      const { result } = renderHook(() => useFindPassword());
      await act(async () => {
        await result.current.sendMail({ type: "click" });
      });
      expect(result.current.randomNumber).toStrictEqual({
        id: "testId",
        number: "testNumber",
      });
      expect(result.current.authStatus).toBe(false);
      expect(alertMock.mock.calls[1][0]).toBe("인증번호를 발송하였습니다");
    });

    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      status.post = 500;
      const { result } = renderHook(() => useFindPassword());
      await act(async () => {
        await result.current.sendMail({ type: "click" });
      });
      expect(alertMock.mock.calls[2][0]).toBe("오류가 발생하였습니다");
    });
  });

  describe("checkAuthNum 함수 테스트", () => {
    it("인증번호가 일치하는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "testNumber" } });
      jest
        .spyOn(CryptoJS.AES, "decrypt")
        .mockReturnValue({ toString: () => "testNumber" });
      const { result } = renderHook(() => useFindPassword());
      act(() => {
        result.current.setRandomNumber({
          id: "testId",
          number: "testNumber",
        });
      });
      act(() => {
        result.current.checkAuthNum({ type: "click" });
      });

      expect(alertMock.mock.calls[3][0]).toBe("인증되었습니다");
      expect(result.current.authStatus).toBe(true);
    });
    it("인증번호가 불일치하는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "testNumber" } });
      jest
        .spyOn(CryptoJS.AES, "decrypt")
        .mockReturnValue({ toString: () => "notMatchtestNumber" });
      const { result } = renderHook(() => useFindPassword());
      act(() => {
        result.current.setRandomNumber({
          id: "testId",
          number: "testNumber",
        });
      });
      act(() => {
        result.current.checkAuthNum({ type: "click" });
      });
      expect(alertMock.mock.calls[4][0]).toBe("인증번호가 일치하지 않습니다");
    });
  });

  describe("changePassword 함수 테스트", () => {
    it("비밀번호 길이가 조건에 맞지 않는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "test@amail.com" } })
        .mockReturnValueOnce({ current: { value: "123456" } })
        .mockReturnValueOnce({ current: { value: "testPassword" } })
        .mockReturnValueOnce({ current: { value: "testPassword" } })
        .mockReturnValueOnce({ current: { value: "test@amail.com" } })
        .mockReturnValueOnce({ current: { value: "123456" } })
        .mockReturnValueOnce({ current: { value: "testPassword" } })
        .mockReturnValueOnce({ current: { value: "testPassword" } });
      const { result } = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
        result.current.emailInputRef;
      });
      await act(async () => {
        await result.current.changePassword({ type: "click" });
      });

      expect(alertMock.mock.calls[5][0]).toBe(
        "비밀번호 길이를 10자리 이하로 줄여주세요"
      );
    });
    it("두 비밀번호가 일치하지 않는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "test@amail.com" } })
        .mockReturnValueOnce({ current: { value: "123456" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "testPasswordnotMatch" } })
        .mockReturnValueOnce({ current: { value: "test@amail.com" } })
        .mockReturnValueOnce({ current: { value: "123456" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "testPasswordnotMatch" } });
      const { result } = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
      });
      await act(async () => {
        await result.current.changePassword({ type: "click" });
      });
      expect(alertMock.mock.calls[6][0]).toBe(
        "두 비밀번호가 일치하지 않습니다"
      );
    });
    it("비밀번호가 변경된 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "test@amail.com" } })
        .mockReturnValueOnce({ current: { value: "123456" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } });
      jest
        .spyOn(CryptoJS.AES, "encrypt")
        .mockReturnValue({ toString: () => "testPassword" });
      status.post = 2001;
      const { result } = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
      });
      await act(async () => {
        await result.current.changePassword({ type: "click" });
      });
      expect(alertMock.mock.calls[7][0]).toBe("변경되었습니다");
      expect(mockRouter.push).toBeCalledWith("/user/auth/signin");
    });
    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "test@amail.com" } })
        .mockReturnValueOnce({ current: { value: "123456" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } });
      status.post = 500;
      const { result } = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
      });
      await act(async () => {
        await result.current.changePassword({ type: "click" });
      });
      expect(alertMock.mock.calls[8][0]).toBe("에러가 발생하였습니다");
    });
  });
});
