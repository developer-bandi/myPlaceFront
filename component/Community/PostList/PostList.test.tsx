import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import usePostList from "./PostListHook";
import configureMockStore from "redux-mock-store";
import { useRouter } from "next/router";
import { ReactNode } from "react";

let status = {
  get: 200,
};
const getMock = jest.fn();
jest.mock("axios", () => {
  return {
    create: jest.fn().mockReturnValue({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      get: jest.fn(() => {
        if (status.get === 200) {
          return Promise.resolve({ status: 200, data: postListMock });
        }
        if (status.get === 500) {
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

const postListMock = {
  count: 1,
  rows: [
    {
      id: 1,
      title: "testTitle",
      content: "testContent",
      viewCount: 1,
      createdAt: "testCreatedAt",
      nickname: "testNickname",
      comment: 1,
      postlikecount: 1,
    },
  ],
};

describe("PostList Hook test", () => {
  afterEach(cleanup);

  let loginStatus = false;
  const mockStore = configureMockStore();
  const loginMockStore = mockStore({
    userLogin: {
      content: { id: 1, nickname: "test" },
      loading: false,
      error: false,
    },
  });
  const logoutMockStore = configureMockStore()({
    userLogin: {
      loading: false,
      error: false,
    },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={loginStatus ? loginMockStore : logoutMockStore}>
      {children}
    </Provider>
  );
  window.scrollTo = jest.fn();

  describe("changeSort 함수 검증", () => {
    describe("정상적으로 받아온 경우", () => {
      it("검색 키워드가 있는 경우", async () => {
        status.get = 200;
        const { result } = renderHook(() => usePostList(postListMock), {
          wrapper,
          initialProps: {
            login: false,
          },
        });
        act(() => {
          result.current.setKeyword("test");
        });
        await act(async () => {
          await result.current.changeSort("likeCount");
        });
        expect(result.current.postList).toStrictEqual({
          content: postListMock,
          loading: false,
          error: false,
        });
        expect(result.current.selectedSort).toBe("likeCount");
        expect(result.current.page).toBe(1);
      });
      it("검색 키워드가 없는 경우", async () => {
        status.get = 200;
        const { result } = renderHook(() => usePostList(postListMock), {
          wrapper,
          initialProps: {
            login: false,
          },
        });
        await act(async () => {
          await result.current.changeSort("likeCount");
        });
        expect(result.current.postList).toStrictEqual({
          content: postListMock,
          loading: false,
          error: false,
        });
        expect(result.current.selectedSort).toBe("likeCount");
        expect(result.current.page).toBe(1);
      });
    });
    it("에러가 발생한 경우", async () => {
      status.get = 500;
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
        initialProps: {
          login: false,
        },
      });
      await act(async () => {
        await result.current.changeSort("likeCount");
      });
      expect(result.current.postList).toStrictEqual({
        loading: false,
        error: true,
      });
    });
  });
  describe("changePage 함수 검증", () => {
    describe("정상적으로 받아온 경우", () => {
      it("검색 키워드가 있는 경우", async () => {
        status.get = 200;
        const { result } = renderHook(() => usePostList(postListMock), {
          wrapper,
          initialProps: {
            login: false,
          },
        });
        act(() => {
          result.current.setKeyword("test");
        });
        await act(async () => {
          await result.current.changePage(2);
        });
        expect(result.current.postList).toStrictEqual({
          content: postListMock,
          loading: false,
          error: false,
        });
        expect(result.current.selectedSort).toBe("createdAt");
        expect(result.current.page).toBe(2);
      });
      it("검색 키워드가 없는 경우", async () => {
        status.get = 200;
        const { result } = renderHook(() => usePostList(postListMock), {
          wrapper,
          initialProps: {
            login: false,
          },
        });
        await act(async () => {
          await result.current.changePage(2);
        });
        expect(result.current.postList).toStrictEqual({
          content: postListMock,
          loading: false,
          error: false,
        });
        expect(result.current.selectedSort).toBe("createdAt");
        expect(result.current.page).toBe(2);
      });
    });
    it("에러가 발생한 경우", async () => {
      status.get = 500;
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
        initialProps: {
          login: false,
        },
      });
      await act(async () => {
        await result.current.changePage(2);
      });
      expect(result.current.postList).toStrictEqual({
        loading: false,
        error: true,
      });
    });
  });

  describe("searchPost 함수 검증", () => {
    it("클릭하여 정상적으로 받아온 경우", async () => {
      status.get = 200;
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
        initialProps: {
          login: false,
        },
      });
      act(() => {
        result.current.setKeyword("test");
      });
      await act(async () => {
        await result.current.searchPost({ type: "click" });
      });
      expect(result.current.postList).toStrictEqual({
        content: postListMock,
        loading: false,
        error: false,
      });
      expect(result.current.selectedSort).toBe("createdAt");
      expect(result.current.keyword).toBe("");
      expect(result.current.page).toBe(1);
    });
    it("엔터키를 눌러 정상적으로 받아온 경우", async () => {
      status.get = 200;
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
        initialProps: {
          login: false,
        },
      });
      act(() => {
        result.current.setKeyword("test");
      });
      await act(async () => {
        await result.current.searchPost({ type: "click" });
      });
      expect(result.current.postList).toStrictEqual({
        content: postListMock,
        loading: false,
        error: false,
      });
      expect(result.current.selectedSort).toBe("createdAt");
      expect(result.current.keyword).toBe("");
      expect(result.current.page).toBe(1);
    });
    it("에러가 발생한 경우", async () => {
      status.get = 500;
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
      });
      act(() => {
        result.current.setKeyword("test");
      });
      await act(async () => {
        await result.current.searchPost({ type: "keypress", key: "Enter" });
      });
      expect(result.current.postList).toStrictEqual({
        loading: false,
        error: true,
      });
    });
  });

  describe("moveWritePage 함수 검증", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    it("로그인 한 경우", async () => {
      loginStatus = true;
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
      });
      act(() => {
        result.current.moveWritePage();
      });
      await waitFor(() => {
        expect(mockRouter.push.mock.calls[0][0]).toBe("/community/writepost");
      });
    });

    it("로그인 하지 않은 경우", async () => {
      loginStatus = false;
      window.alert = jest.fn();
      const { result } = renderHook(() => usePostList(postListMock), {
        wrapper,
      });

      act(() => {
        result.current.moveWritePage();
      });
      await waitFor(() => {
        expect(mockRouter.push.mock.calls[1][0]).toBe("/user/auth/signin");
        expect(window.alert).toHaveBeenCalledWith("로그인이 필요합니다.");
      });
    });
  });
});
