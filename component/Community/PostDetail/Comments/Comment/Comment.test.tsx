import useComment from "./CommentHook";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react";

let loginStatus = true;
const loginMockStore = configureMockStore()({
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

afterEach(() => {
  loginMockStore.clearActions();
});

describe("Comment Hook 테스트", () => {
  describe("dispatchDeleteComment 함수 테스트", () => {
    it("정상 삭제", () => {
      window.confirm = jest.fn(() => true);
      const { result } = renderHook(() => useComment(), {
        wrapper,
      });
      result.current.dispatchDeleteComment({ commentId: 1, userId: 1 });

      expect(loginMockStore.getActions()[0]).toEqual({
        payload: { commentId: 1, userId: 1 },
        type: "postDetail/deleteComment",
      });
    });

    it("삭제 취소한 경우", () => {
      window.confirm = jest.fn(() => false);
      const { result } = renderHook(() => useComment(), {
        wrapper,
      });
      result.current.dispatchDeleteComment({ commentId: 1, userId: 1 });

      expect(loginMockStore.getActions()[0]).toEqual(undefined);
    });
  });

  describe("isMyComment 함수 테스트", () => {
    it("로그인 되어있고, 내 댓글에 해당하는 경우", () => {
      const { result } = renderHook(() => useComment(), {
        wrapper,
      });

      const flag = result.current.isMyComment(1);

      expect(flag).toEqual(true);
    });

    it("로그인 되어있지만 내댓글이 아닌경우", () => {
      const { result } = renderHook(() => useComment(), {
        wrapper,
      });

      const flag = result.current.isMyComment(2);

      expect(flag).toEqual(false);
    });

    it("로그인 되어있지 않은 경우", () => {
      loginStatus = false;
      const { result } = renderHook(() => useComment(), {
        wrapper,
      });
      const flag = result.current.isMyComment(1);

      expect(flag).toEqual(false);
    });
  });
});
