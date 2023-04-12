import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import newReact from "react";
import useMyInfoSetting from "./MyInfoSettingHook";

let status = {
  patch: 200,
};
const mockedUserInfo = {
  localId: "testLocalId",
  nickname: "testNickname",
  provider: "local",
  createdAt: "testCreatedAt",
  email: "testEmail",
};
jest.mock("axios", () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      patch: jest.fn(() => {
        if (status.patch === 200) {
          return Promise.resolve({
            status: 200,
            data: mockedUserInfo,
          });
        }
        if (status.patch === 500) {
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
  pathname: "",
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("MyInfoSetting Hook 테스트", () => {
  describe("changeNickname 함수 테스트", () => {
    it("정상적으로 변경되는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "" } });
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      const { result } = renderHook(() =>
        useMyInfoSetting({
          content: mockedUserInfo,
          loading: false,
          error: false,
        })
      );
      await act(async () => {
        await result.current.changeNickname();
      });
      expect(window.alert).toBeCalledWith("수정되었습니다");
    });
    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "" } });
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      status.patch = 500;
      const { result } = renderHook(() =>
        useMyInfoSetting({
          content: mockedUserInfo,
          loading: false,
          error: false,
        })
      );
      await act(async () => {
        await result.current.changeNickname();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});
