import { act, renderHook } from "@testing-library/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import useCommentInput from "./CommentInputHook";
import * as customHook from "../../../../lib/customHook/useInNotLogin";

describe("CommentInput Hook 테스트", () => {
  let loginStatus = true;
  const mockStore = configureMockStore();
  const loginMockStore = mockStore({
    userLogin: {
      content: { id: 1, nickname: "test" },
      loading: false,
      error: false,
    },
    postDetail: { content: { id: 1 } },
  });
  const logoutMockStore = configureMockStore()({
    userLogin: {
      loading: false,
      error: false,
    },
    postDetail: {},
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={loginStatus ? loginMockStore : logoutMockStore}>
      {children}
    </Provider>
  );

  describe("dispatchPostComment 테스트", () => {
    it("로그인 한경우", () => {
      jest
        .spyOn(React, "useRef")
        .mockReturnValue({ current: { value: "test" } });

      const { result } = renderHook(() => useCommentInput(), {
        wrapper,
      });

      act(() => {
        result.current.dispatchPostComment();
      });

      expect(result.current.textareaRef).toStrictEqual({
        current: { value: "" },
      });
      expect(loginMockStore.getActions()[0]).toStrictEqual({
        payload: { content: "test", id: 1 },
        type: "postDetail/postComment",
      });
    });

    it("로그인 안한경우", async () => {
      loginStatus = false;
      const nextActionMock = jest.fn();
      jest
        .spyOn(React, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      jest
        .spyOn(customHook, "useIsNotLogin")
        .mockReturnValue({ nextAction: nextActionMock });

      const { result } = renderHook(() => useCommentInput(), {
        wrapper,
      });

      act(() => {
        result.current.dispatchPostComment();
      });

      expect(nextActionMock).toBeCalledTimes(1);
    });
  });
});
