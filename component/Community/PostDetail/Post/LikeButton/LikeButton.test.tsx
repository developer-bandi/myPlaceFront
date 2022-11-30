import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import useLikeButton from "./LikeButtonHook";

let mockStoreOrder = 2;

const loginMockStore = configureMockStore()({
  userLogin: {
    content: { id: 1, nickname: "test" },
    loading: false,
    error: false,
  },
  postDetail: {
    content: { likelist: [1, 2, 3] },
  },
});

const loginNotMatchMockStore = configureMockStore()({
  userLogin: {
    content: { id: 1, nickname: "test" },
    loading: false,
    error: false,
  },
  postDetail: {
    content: { likelist: [2, 3] },
  },
});

const logoutMockStore = configureMockStore()({
  userLogin: {
    loading: false,
    error: false,
  },
  postDetail: {
    content: { UserId: 1, likelist: [1, 2, 3] },
  },
});

const mockStoreList = [loginMockStore, loginNotMatchMockStore, logoutMockStore];

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={mockStoreList[mockStoreOrder]}>{children}</Provider>
);

describe("LikeButton Hook 테스트", () => {
  describe("dispatchUpdateLike 함수 테스트", () => {
    it("로그인 안된 경우", () => {
      window.alert = jest.fn();
      const { result } = renderHook(() => useLikeButton(), {
        wrapper,
      });
      result.current.dispatchUpdateLike();

      expect(window.alert).toBeCalledTimes(1);
    });

    it("로그인 한경우", () => {
      mockStoreOrder = 0;
      window.alert = jest.fn();
      const { result } = renderHook(() => useLikeButton(), {
        wrapper,
      });
      result.current.dispatchUpdateLike();

      expect(loginMockStore.getActions()[0]).toEqual({
        payload: {
          id: 1,
          type: "down",
        },
        type: "postDetail/updateLikeCount",
      });
    });
  });

  describe("checkLike 함수 테스트", () => {
    it("로그인 안된 경우", () => {
      mockStoreOrder = 2;
      const { result } = renderHook(() => useLikeButton(), {
        wrapper,
      });
      const flag = result.current.checkLike();

      expect(flag).toEqual("noLogin");
    });

    it("로그인 하였고 좋아요를 이미 누른경우", () => {
      mockStoreOrder = 0;
      const { result } = renderHook(() => useLikeButton(), {
        wrapper,
      });
      const flag = result.current.checkLike();

      expect(flag).toEqual("down");
    });

    it("로그인 하였고 아직 좋아요를 누르지 않은 경우", () => {
      mockStoreOrder = 1;
      const { result } = renderHook(() => useLikeButton(), {
        wrapper,
      });
      const flag = result.current.checkLike();

      expect(flag).toEqual("up");
    });
  });
});
