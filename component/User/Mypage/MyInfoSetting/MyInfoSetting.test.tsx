import {act, render, renderHook, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import {useRouter} from "next/router";
import * as React from "react";
import newReact from "react";
import MyInfoSetting from "./MyInfoSetting";
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
  provider: "testProvider",
  createdAt: "testCreatedAt",
  email: "testEmail",
};

describe("MyInfoSetting Presentational Test", () => {
  describe("데스크톱 일경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyInfoSetting
          userInfo={{loading: true, error: false}}
          changeNickname={jest.fn()}
          nicknameInputRef={{current: null}}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("loading");
    });
    it("에러발생", () => {
      const utils = render(
        <MyInfoSetting
          userInfo={{loading: false, error: true}}
          changeNickname={jest.fn()}
          nicknameInputRef={{current: null}}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("error");
    });
    it("정상 출력", () => {
      const utils = render(
        <MyInfoSetting
          userInfo={{content: mockedUserInfo, loading: false, error: false}}
          changeNickname={jest.fn()}
          nicknameInputRef={{current: null}}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("result");
    });
  });
  describe("노트북 이하일 경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyInfoSetting
          userInfo={{loading: true, error: false}}
          changeNickname={jest.fn()}
          nicknameInputRef={{current: null}}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("loading");
    });
    it("에러발생", () => {
      const utils = render(
        <MyInfoSetting
          userInfo={{loading: false, error: true}}
          changeNickname={jest.fn()}
          nicknameInputRef={{current: null}}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("error");
    });
    it("정상 출력", () => {
      const utils = render(
        <MyInfoSetting
          userInfo={{content: mockedUserInfo, loading: false, error: false}}
          changeNickname={jest.fn()}
          nicknameInputRef={{current: null}}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("result");
    });
  });
});

describe("MyInfoSetting Hook 테스트", () => {
  describe("데이터를 받아오는 useEffect 테스트", () => {
    it("정상적으로 데이터를 받아온 경우", async () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: mockedUserInfo,
        })
      );
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      const {result} = renderHook(() => useMyInfoSetting());
      waitFor(() => {
        expect(result.current.userInfo).toStrictEqual({
          content: mockedUserInfo,
          loading: false,
          error: false,
        });
        expect(result.current.nicknameInputRef.current).toBe("testNickname");
      });
    });

    it("에러가 발생한 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      mockedAxios.get.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "error",
        })
      );

      const {result} = renderHook(() => useMyInfoSetting(), {});

      waitFor(() => {
        expect(result.current.userInfo).toStrictEqual({
          loading: false,
          error: true,
        });
      });
    });
  });

  describe("changeNickname 함수 테스트", () => {
    it("정상적으로 변경되는 경우", async () => {
      jest.spyOn(newReact, "useRef").mockReturnValue({current: {value: ""}});
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      mockedAxios.patch.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: mockedUserInfo,
        })
      );
      const {result} = renderHook(() => useMyInfoSetting());
      await act(async () => {
        await result.current.changeNickname();
      });
      expect(window.alert).toBeCalledWith("수정되었습니다");
    });
    it("에러가 발생한 경우", async () => {
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn();
      mockedAxios.patch.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "data",
        })
      );
      const {result} = renderHook(() => useMyInfoSetting());
      await act(async () => {
        await result.current.changeNickname();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});
