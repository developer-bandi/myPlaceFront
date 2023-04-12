import { useRouter } from "next/router";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useUpdateReview from "./UpdateReviewHook";

let status = {
  get: 200,
  patch: 200,
};
jest.mock("axios", () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      get: jest.fn(() => {
        if (status.get === 200) {
          return Promise.resolve({
            status: 200,
            data: {
              storeInfo: { name: "testName", category: "testCategory" },
              Hashtags: [],
              photo: [],
              content: "test",
            },
          });
        }
        if (status.get === 500) {
          return Promise.reject({
            status: 500,
            data: "에러 발생",
          });
        }
      }),
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

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
  query: { id: 1 },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("UpdateReview Hook 테스트", () => {
  const storeInfoMockStore = configureMockStore()({
    hashtagAll: {},
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={storeInfoMockStore}>{children}</Provider>
  );
  describe("데이터를 받아오는 useEffect 테스트", () => {
    it("정상적으로 반영하는 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({ current: { value: "" } })
        .mockReturnValueOnce({ current: { value: "" } });

      const { result } = renderHook(() => useUpdateReview(), { wrapper });
      await waitFor(() => {
        expect(result.current.storeInfo).toEqual({
          name: "testName",
          category: "testCategory",
        });
        expect(result.current.selectedHashtag).toEqual([]);
        expect(result.current.existImg).toEqual([]);
        expect(result.current.existInfo).toEqual({
          storeInfo: { name: "testName", category: "testCategory" },
          Hashtags: [],
          photo: [],
          content: "test",
        });
        expect(storeInfoMockStore.getActions()[0]).toEqual({
          payload: undefined,
          type: "hashtagAll/getHashtagAll",
        });
        expect(result.current.error).toBe(false);
        expect(result.current.loading).toBe(false);
        expect(result.current.textAreaRef.current).toEqual({ value: "test" });
      });
    });
    it("에러가 발생한 경우", async () => {
      status.get = 500;
      const { result } = renderHook(() => useUpdateReview(), { wrapper });
      await waitFor(() => {
        expect(result.current.error).toBe(true);
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe("changeHashtag", () => {
    it("해시태그를 선택하는 경우", async () => {
      window.alert = jest.fn();

      const { result } = renderHook(() => useUpdateReview(), { wrapper });
      act(() => {
        result.current.changeHashtag("testHashtag");
      });

      await waitFor(() => {
        expect(result.current.selectedHashtag).toEqual(["testHashtag"]);
      });
    });
    it("해시태그 선택을 해제하는 경우", async () => {
      window.alert = jest.fn();

      const { result } = renderHook(() => useUpdateReview(), { wrapper });
      act(() => {
        result.current.setSelectedHashtag(["testHashtag"]);
      });
      act(() => {
        result.current.changeHashtag("testHashtag");
      });
      await waitFor(() => {
        expect(result.current.selectedHashtag).toEqual([]);
      });
    });
  });

  describe("sumbmit함수 테스트", () => {
    it("정상적으로 업데이트 된 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      window.alert = jest.fn();

      const { result } = renderHook(() => useUpdateReview(), { wrapper });
      act(() => {
        result.current.setExistInfo({
          id: 1,
          storeInfo: {
            name: "testName",
            category: "testCategory",
            address: "testAddress",
          },
          Hashtags: [],
          photo: [],
          content: "test",
        });
      });
      await act(async () => {
        await result.current.submit();
      });
      await waitFor(() => {
        expect(window.alert).toBeCalledWith("정상적으로 수정되었습니다");
        expect(mockRouter.push).toBeCalledWith("/user/mypage/review");
      });
    });

    it("에러가 발생한 경우", async () => {
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "" } });
      status.patch = 500;
      window.alert = jest.fn();

      const { result } = renderHook(() => useUpdateReview(), { wrapper });
      act(() => {
        result.current.setExistInfo({
          id: 1,
          storeInfo: {
            name: "testName",
            category: "testCategory",
            address: "testAddress",
          },
          Hashtags: [],
          photo: [],
          content: "test",
        });
      });
      await act(async () => {
        await result.current.submit();
      });
      await waitFor(() => {
        expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
      });
    });
  });
});
