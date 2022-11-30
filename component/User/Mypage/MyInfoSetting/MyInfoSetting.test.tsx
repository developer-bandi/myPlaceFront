import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import newReact from "react";
import useMyInfoSetting from "./MyInfoSettingHook";

jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  pathname: "",
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedUserInfo = {
  localId: "testLocalId",
  nickname: "testNickname",
  provider: "local",
  createdAt: "testCreatedAt",
  email: "testEmail",
};

describe("MyInfoSetting Hook 테스트", () => {
  describe("changeNickname 함수 테스트", () => {
    it("정상적으로 변경되는 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "" } });
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      mockedAxios.patch.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: mockedUserInfo,
        })
      );
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
      mockedAxios.patch.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "data",
        })
      );
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
