import { useRouter } from "next/router";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import { act, renderHook } from "@testing-library/react";
import axios from "axios";
import useUpdateStoreInfo from "./UpdateStoreInfoHook";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

let status = {
  patch: 200,
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
            data: "test",
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

describe("UpdateStoreInfo Hook 테스트", () => {
  let blank = false;
  const storeInfoMockStore = configureMockStore()({
    storeInfo: {
      content: {
        storeInfo: {
          name: "testName",
          category: "testCategory",
          tel: "testTel",
          openingHours: "testOpeningHours",
        },
      },
    },
  });
  const storeInfoBlankMockStore = configureMockStore()({
    storeInfo: {
      content: {},
    },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={blank ? storeInfoBlankMockStore : storeInfoMockStore}>
      {children}
    </Provider>
  );
  describe("데이터를 받아오는 useEffect 테스트", () => {
    it("정상적으로 반영하는 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "test1" } })
        .mockReturnValueOnce({ current: { value: "test2" } })
        .mockReturnValueOnce({ current: { value: "test3" } })
        .mockReturnValueOnce({ current: { value: "test4" } })
        .mockReturnValueOnce({ current: { value: "test5" } })
        .mockReturnValueOnce({ current: { value: "test6" } })
        .mockReturnValueOnce({ current: { value: "test7" } })
        .mockReturnValueOnce({ current: { value: "test8" } });

      const { result } = renderHook(() => useUpdateStoreInfo(), { wrapper });
      expect(result.current.storeNameInputRef.current).toEqual({
        value: "testName",
      });
      expect(result.current.categorySelectRef.current).toEqual({
        value: "testCategory",
      });
      expect(result.current.telRef.current).toEqual({ value: "testTel" });
      expect(result.current.openninghourTextareaRef.current).toEqual({
        value: "testOpeningHours",
      });
    });
    it("정상적으로 반영하지 못하는 경우", () => {
      blank = true;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      window.alert = jest.fn();
      const { result } = renderHook(() => useUpdateStoreInfo(), { wrapper });
      expect(window.alert).toBeCalledWith(
        "수정할 가게 정보가 없습니다. 가게를 선택해주세요"
      );
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });
  });

  describe("sumbmit함수 테스트", () => {
    it("가게이름을 입력하지 않은 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: {} });
      window.alert = jest.fn();
      const { result } = renderHook(() => useUpdateStoreInfo(), { wrapper });
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
      const { result } = renderHook(() => useUpdateStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("카테고리를 선택해 주세요");
    });
    it("정상적으로 전송한 경우", async () => {
      blank = false;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      window.alert = jest.fn();
      const { result } = renderHook(() => useUpdateStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("정상적으로 수정되었습니다");
      expect(storeInfoMockStore.getActions()[0]).toEqual({
        payload: undefined,
        type: "storeInfo/getStoreInfo",
      });
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });
    it("에러가 발생한 경우", async () => {
      blank = false;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      status.patch = 500;
      window.alert = jest.fn();
      const { result } = renderHook(() => useUpdateStoreInfo(), { wrapper });
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});
