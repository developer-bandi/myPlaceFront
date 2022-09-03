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
import useFindPassword from "./FindPasswordHook";
import FindPassword from "./FindPassword";
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

describe("FindPassword Presentational 테스트", () => {
  it("이메일 입력단계", () => {
    const sendMailMock = jest.fn();
    const utils = render(
      <FindPassword
        randomNumber={undefined}
        emailInputRef={{current: null}}
        randomNumberInputRef={{current: null}}
        sendMail={sendMailMock}
        checkAuthNum={jest.fn()}
        authStatus={false}
        passwordRef={{current: null}}
        passwordCheckRef={{current: null}}
        changePassword={jest.fn()}
      />
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("sendMail"));
    expect(sendMailMock).toBeCalled();
  });

  it("인증번호 입력단계", () => {
    const checkAuthNumMock = jest.fn();
    const utils = render(
      <FindPassword
        randomNumber={{id: "test", number: "test"}}
        emailInputRef={{current: null}}
        randomNumberInputRef={{current: null}}
        sendMail={jest.fn()}
        checkAuthNum={checkAuthNumMock}
        authStatus={false}
        passwordRef={{current: null}}
        passwordCheckRef={{current: null}}
        changePassword={jest.fn()}
      />
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("checkAuthNum"));
    expect(checkAuthNumMock).toBeCalled();
  });

  it("비밀번호 입력단계", () => {
    const changePasswordMock = jest.fn();
    const utils = render(
      <FindPassword
        randomNumber={{id: "test", number: "test"}}
        emailInputRef={{current: null}}
        randomNumberInputRef={{current: null}}
        sendMail={jest.fn()}
        checkAuthNum={jest.fn()}
        authStatus={true}
        passwordRef={{current: null}}
        passwordCheckRef={{current: null}}
        changePassword={changePasswordMock}
      />
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("changePassword"));
    expect(changePasswordMock).toBeCalled();
  });
});

describe("FindPassword Hook 테스트", () => {
  describe("sendMail 함수 테스트", () => {
    it("이메일이 존재하지 않는 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({
          status: 203,
          data: "아이디 중복",
        })
      );
      const {result} = renderHook(() => useFindPassword());
      await act(async () => {
        await result.current.sendMail();
      });
      expect(alertMock.mock.calls[0][0]).toBe("이메일이 존재하지 않습니다");
    });

    it("정상적으로 메일을 발송한 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: {id: "testId", number: "testNumber"},
        })
      );
      const {result} = renderHook(() => useFindPassword());
      await act(async () => {
        await result.current.sendMail();
      });
      expect(result.current.randomNumber).toStrictEqual({
        id: "testId",
        number: "testNumber",
      });
      expect(result.current.authStatus).toBe(false);
      expect(alertMock.mock.calls[1][0]).toBe("인증번호를 발송하였습니다");
    });

    it("에러가 발생한 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "error",
        })
      );
      const {result} = renderHook(() => useFindPassword());
      await act(async () => {
        await result.current.sendMail();
      });
      expect(alertMock.mock.calls[2][0]).toBe("오류가 발생하였습니다");
    });
  });

  describe("checkAuthNum 함수 테스트", () => {
    it("인증번호가 일치하는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "testNumber"}});
      jest
        .spyOn(CryptoJS.AES, "decrypt")
        .mockReturnValue({toString: () => "testNumber"});
      const {result} = renderHook(() => useFindPassword());
      act(() => {
        result.current.setRandomNumber({
          id: "testId",
          number: "testNumber",
        });
      });
      act(() => {
        result.current.checkAuthNum();
      });

      expect(alertMock.mock.calls[3][0]).toBe("인증되었습니다");
      expect(result.current.authStatus).toBe(true);
    });
    it("인증번호가 불일치하는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "testNumber"}});
      jest
        .spyOn(CryptoJS.AES, "decrypt")
        .mockReturnValue({toString: () => "notMatchtestNumber"});
      const {result} = renderHook(() => useFindPassword());
      act(() => {
        result.current.setRandomNumber({
          id: "testId",
          number: "testNumber",
        });
      });
      act(() => {
        result.current.checkAuthNum();
      });
      expect(alertMock.mock.calls[4][0]).toBe("인증번호가 일치하지 않습니다");
    });
  });

  describe("changePassword 함수 테스트", () => {
    it("비밀번호 길이가 조건에 맞지 않는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({current: {value: "test@amail.com"}})
        .mockReturnValueOnce({current: {value: "123456"}})
        .mockReturnValueOnce({current: {value: "testPassword"}})
        .mockReturnValueOnce({current: {value: "testPassword"}})
        .mockReturnValueOnce({current: {value: "test@amail.com"}})
        .mockReturnValueOnce({current: {value: "123456"}})
        .mockReturnValueOnce({current: {value: "testPassword"}})
        .mockReturnValueOnce({current: {value: "testPassword"}});
      const {result} = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
        result.current.emailInputRef;
      });
      await act(async () => {
        await result.current.changePassword();
      });

      expect(alertMock.mock.calls[5][0]).toBe(
        "비밀번호 길이를 10자리 이하로 줄여주세요"
      );
    });
    it("두 비밀번호가 일치하지 않는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({current: {value: "test@amail.com"}})
        .mockReturnValueOnce({current: {value: "123456"}})
        .mockReturnValueOnce({current: {value: "test"}})
        .mockReturnValueOnce({current: {value: "testPasswordnotMatch"}})
        .mockReturnValueOnce({current: {value: "test@amail.com"}})
        .mockReturnValueOnce({current: {value: "123456"}})
        .mockReturnValueOnce({current: {value: "test"}})
        .mockReturnValueOnce({current: {value: "testPasswordnotMatch"}});
      const {result} = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
      });
      await act(async () => {
        await result.current.changePassword();
      });
      expect(alertMock.mock.calls[6][0]).toBe(
        "두 비밀번호가 일치하지 않습니다"
      );
    });
    it("비밀번호가 변경된 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({current: {value: "test@amail.com"}})
        .mockReturnValueOnce({current: {value: "123456"}})
        .mockReturnValueOnce({current: {value: "test"}})
        .mockReturnValueOnce({current: {value: "test"}});
      jest
        .spyOn(CryptoJS.AES, "encrypt")
        .mockReturnValue({toString: () => "testPassword"});
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "test",
        })
      );
      const {result} = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
      });
      await act(async () => {
        await result.current.changePassword();
      });
      expect(alertMock.mock.calls[7][0]).toBe("변경되었습니다");
      expect(mockRouter.push).toBeCalledWith("/user/auth/signin");
    });
    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({current: {value: "test@amail.com"}})
        .mockReturnValueOnce({current: {value: "123456"}})
        .mockReturnValueOnce({current: {value: "test"}})
        .mockReturnValueOnce({current: {value: "test"}});
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "test",
        })
      );
      const {result} = renderHook(() => useFindPassword());
      act(() => {
        result.current.setAuthStatus(true);
      });
      await act(async () => {
        await result.current.changePassword();
      });
      expect(alertMock.mock.calls[8][0]).toBe("에러가 발생하였습니다");
    });
  });
});
