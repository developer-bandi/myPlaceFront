import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import newReact from "react";
import * as React from "react";
import { useRouter } from "next/router";
import useSignupForm from "./SignupFormHook";
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
            data: "아이디 중복",
          });
        }
        if (status.post === 200) {
          return Promise.resolve({
            status: 200,
            data: "회원가입 성공",
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

jest.spyOn(CryptoJS.AES, "encrypt").mockReturnValue({ toString: () => "test" });
window.confirm = jest.fn(() => true);

describe("SignupForm Hook 테스트", () => {
  describe("signup 함수 테스트", () => {
    it("아이디가 조건에 부합하지 않는경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[0][0]).toBe("아이디를 정확히 입력하세요");
    });

    it("비밀번호가 조건에 부합하지 않는경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } });
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[1][0]).toBe("비밀번호를 정확히 입력하세요");
    });

    it("두가지 비밀번호가 일치하지 않는경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test1" } })
        .mockReturnValueOnce({ current: { value: "test2" } });
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[2][0]).toBe(
        "확인 비밀번호가 일치하지 않습니다 다시 입력해주세요"
      );
    });

    it("닉네임이 조건에 부합하지 않는경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } });
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[3][0]).toBe("닉네임을 정확하게 입력하세요");
    });

    it("이메일이 조건에 부합하지 않는경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } });
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[4][0]).toBe(
        "이메일의 형태가 정확하지 않습니다"
      );
    });

    it("서버 검증결과 데이터가 부합하지 않는경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test@tmail.com" } });

      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[5][0]).toBe("아이디 중복");
    });

    it("로그인에 성공한경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test@tmail.com" } });
      status.post = 200;
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[6][0]).toBe("회원가입에 성공하였습니다.");
      expect(mockRouter.push).toBeCalledWith("/user/auth/signin");
    });

    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test" } })
        .mockReturnValueOnce({ current: { value: "test@tmail.com" } });
      status.post = 500;
      const { result } = renderHook(() => useSignupForm());
      await act(async () => {
        await result.current.signup({ type: "click" });
      });
      expect(alertMock.mock.calls[7][0]).toBe("서버에 에러가 발생하였습니다");
    });
  });
});
