import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import useHeader from "./HeaderHook";

let mockStoreOrder = 0;

const loginMockStore = configureMockStore()({
  userLogin: {
    content: { id: 1, nickname: "test" },
    loading: false,
    error: false,
  },
  postDetail: {
    content: { UserId: 1, User: { nickname: "test1" } },
  },
});

const loginNotMatchMockStore = configureMockStore()({
  userLogin: {
    content: { id: 1, nickname: "test" },
    loading: false,
    error: false,
  },
  postDetail: {
    content: { UserId: 2, User: { nickname: "test2" } },
  },
});

const logoutMockStore = configureMockStore()({
  userLogin: {
    loading: false,
    error: false,
  },
  postDetail: {
    content: { UserId: 1, User: { nickname: "test1" } },
  },
});

const mockStoreList = [loginMockStore, loginNotMatchMockStore, logoutMockStore];

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={mockStoreList[mockStoreOrder]}>{children}</Provider>
);

afterEach(() => {
  loginMockStore.clearActions();
});

describe("Header Hook 테스트", () => {
  describe("dispatchDeletePost 함수 테스트", () => {
    it("정상 삭제", () => {
      window.confirm = jest.fn(() => true);

      const { result } = renderHook(() => useHeader(), {
        wrapper,
      });

      result.current.dispatchDeletePost({
        postId: "1",
        userId: 1,
      });

      expect(loginMockStore.getActions()[0]).toStrictEqual({
        payload: { postId: "1", router: null, userId: 1 },
        type: "postDetail/deletePost",
      });
    });

    it("삭제 안하는 경우", () => {
      window.confirm = jest.fn(() => false);

      const { result } = renderHook(() => useHeader(), {
        wrapper,
      });

      result.current.dispatchDeletePost({
        postId: "1",
        userId: 1,
      });

      expect(loginMockStore.getActions()[0]).toStrictEqual(undefined);
    });
  });

  describe("isMyPost 함수 테스트", () => {
    it("로그인을 하였고 해당 유저의 게시글인 경우", () => {
      const { result } = renderHook(() => useHeader(), {
        wrapper,
      });

      const flag = result.current.isMyPost();

      expect(flag).toBe(true);
    });

    it("로그인을 했지만 해당 유저의 게시글이 아닌경우", () => {
      mockStoreOrder += 1;

      const { result } = renderHook(() => useHeader(), {
        wrapper,
      });

      const flag = result.current.isMyPost();

      expect(flag).toBe(false);
    });
    it("로그인을 안한 경우", () => {
      mockStoreOrder += 1;

      const { result } = renderHook(() => useHeader(), {
        wrapper,
      });

      const flag = result.current.isMyPost();

      expect(flag).toBe(false);
    });
  });
});
