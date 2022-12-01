import { useRouter } from "next/router";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import { act, renderHook } from "@testing-library/react";
import useAddStoreInfo from "./AddStoreInfoHook";
import axios from "axios";

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

describe("AddStoreInfo Hook 테스트", () => {
  const mockStore = configureMockStore();
  const StorePositionMockStore = mockStore({
    addStorePosition: {
      address: "",
      longitude: "",
      latitude: "",
    },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={StorePositionMockStore}>{children}</Provider>
  );
  it("useEffect 테스트", () => {
    const useRefSpy = jest
      .spyOn(newReact, "useRef")
      .mockReturnValue({ current: { value: "test" } });
    window.alert = jest.fn();
    const { result } = renderHook(() => useAddStoreInfo(), { wrapper });
    expect(window.alert).toBeCalledWith("주소를 먼저 설정해주세요");
    expect(mockRouter.push).toBeCalledWith("/contribute/addstoreposition");
  });

  describe("sumbmit함수 테스트", () => {
    it("가게이름을 입력하지 않은 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: {} });
      window.alert = jest.fn();
      const { result } = renderHook(() => useAddStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("가게 이름을 입력해주세요");
    });
    it("카테고리를 선택하지 않은 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "category" } });
      window.alert = jest.fn();
      const { result } = renderHook(() => useAddStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("카테고리를 선택해 주세요");
    });
    it("정상적으로 전송한 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({ status: 200, data: "test" })
      );
      window.alert = jest.fn();
      const { result } = renderHook(() => useAddStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("성공적으로 등록되었습니다");
      expect(mockRouter.push).toBeCalledWith("/");
    });
    it("에러가 발생한 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({ status: 500, data: "error" })
      );
      window.alert = jest.fn();
      const { result } = renderHook(() => useAddStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});
