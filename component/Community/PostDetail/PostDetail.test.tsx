import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import axios from "axios";
import {useRouter} from "next/router";
import React, {ReactNode} from "react";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {postDetailType} from "../../../lib/apitype/post";
import PostDetail from "./PostDetail";
import usePostDetail from "./PostDetailHook";

jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const axiosMock = axios as jest.Mocked<typeof axios>;
const postDetailMock: postDetailType = {
  Comments: [],
  Photos: [],
  User: {id: 1, nickname: "test"},
  UserId: 1,
  content: "test",
  createdAt: "test",
  id: 1,
  likelist: [],
  title: "test",
  updatedAt: "test",
  viewCount: 1,
};

describe("PostDetail Presentational 테스트", () => {
  const deleteOrPostLikecountMock = jest.fn();
  const deleteCommentMock = jest.fn();
  const deletePostMock = jest.fn();
  const postCommentMock = jest.fn();
  const utils = render(
    <PostDetail
      serverSideData={postDetailMock}
      textareaRef={{current: null}}
      comments={[
        {
          PostId: 1,
          User: {
            id: 1,
            nickname: "test",
          },
          UserId: 1,
          content: "test",
          createdAt: "test",
          id: 1,
          updatedAt: "test",
        },
      ]}
      likelist={[]}
      postComment={postCommentMock}
      loginedUser={{
        content: {id: 1, nickname: "test"},
        loading: false,
        error: false,
      }}
      deleteOrPostLikecount={deleteOrPostLikecountMock}
      deleteComment={deleteCommentMock}
      deletePost={deletePostMock}
    />
  );
  expect(utils.container).toMatchSnapshot();
  fireEvent.click(screen.getByTestId("deleteOrPostLikecount"));
  fireEvent.click(screen.getByTestId("deleteComment"));
  fireEvent.click(screen.getByTestId("deletePost"));
  fireEvent.click(screen.getByTestId("postComment"));

  expect(deleteOrPostLikecountMock).toBeCalledTimes(1);
  expect(deleteCommentMock).toBeCalledTimes(1);
  expect(deletePostMock).toBeCalledTimes(1);
  expect(postCommentMock).toBeCalledTimes(1);
});

describe("postDetail Hook 테스트", () => {
  let loginStatus = true;
  const mockStore = configureMockStore();
  const loginMockStore = mockStore({
    userLogin: {
      content: {id: 1, nickname: "test"},
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
  const wrapper = ({children}: {children: ReactNode}) => (
    <Provider store={loginStatus ? loginMockStore : logoutMockStore}>
      {children}
    </Provider>
  );
  describe("postComment 테스트", () => {
    it("로그인 하여 댓글을 정상등록한 경우", async () => {
      const useRefSpy = jest
        .spyOn(React, "useRef")
        .mockReturnValue({current: {value: "test"}});
      axiosMock.post.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: {
            PostId: 1,
            User: {
              id: 1,
              nickname: "test",
            },
            UserId: 1,
            content: "test",
            createdAt: "test",
            id: 1,
            updatedAt: "test",
          },
        })
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.postComment();
      });

      expect(result.current.comments).toStrictEqual([
        {
          PostId: 1,
          User: {
            id: 1,
            nickname: "test",
          },
          UserId: 1,
          content: "test",
          createdAt: "test",
          id: 1,
          updatedAt: "test",
        },
      ]);
    });

    it("로그인 하였지만 에러가 발생한 경우", async () => {
      const useRefSpy = jest
        .spyOn(React, "useRef")
        .mockReturnValueOnce({current: {value: "test"}});
      window.alert = jest.fn();
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      axiosMock.post.mockImplementation(() =>
        Promise.reject({status: 500, data: "에러발생"})
      );

      await act(async () => {
        await result.current.postComment();
      });
      expect(window.alert).toBeCalledWith(
        "에러가 발생하였습니다 다시 시도해주세요"
      );
    });

    it("로그인 하지 않은 경우", async () => {
      loginStatus = false;
      const mockRouter = {
        push: jest.fn(),
      };
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      const useRefSpy = jest
        .spyOn(React, "useRef")
        .mockReturnValueOnce({current: "test"});
      window.alert = jest.fn();
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.postComment();
      });
      expect(window.alert).toBeCalledWith("로그인 해주세요");
      expect(mockRouter.push).toBeCalledWith("/user/auth/signin");
    });
  });

  describe("deleteComment 함수 테스트", () => {
    window.confirm = jest.fn(() => true);
    it("정상 삭제", async () => {
      postDetailMock.Comments.push({
        PostId: 1,
        User: {
          id: 1,
          nickname: "test",
        },
        UserId: 1,
        content: "test",
        createdAt: "test",
        id: 1,
        updatedAt: "test",
      });
      axiosMock.delete.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "test",
        })
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deleteComment(1, 1);
      });
      expect(window.alert).toBeCalledWith("댓글을 삭제하였습니다");
      expect(result.current.comments.length).toBe(0);
    });
    it("오류 발생", async () => {
      window.alert = jest.fn();
      axiosMock.delete.mockImplementation(() =>
        Promise.reject({status: 500, data: "에러발생"})
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deleteComment(1, 1);
      });
      expect(window.alert).toBeCalledWith(
        "에러가 발생했습니다 다시 시도해보세요"
      );
    });
  });
  describe("deletePost 함수 테스트", () => {
    window.confirm = jest.fn(() => true);
    it("정상 삭제", async () => {
      const mockRouter = {
        push: jest.fn(),
      };
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      axiosMock.delete.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "test",
        })
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deletePost(1, 1);
      });
      expect(mockRouter.push).toBeCalledWith("/community/postlist");
    });
    it("오류 발생", async () => {
      window.alert = jest.fn();
      axiosMock.delete.mockImplementation(() =>
        Promise.reject({status: 500, data: "에러발생"})
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deletePost(1, 1);
      });
      expect(window.alert).toBeCalledWith(
        "에러가 발생했습니다 다시 시도해보세요"
      );
    });
  });
  describe("deleteOrPostLikecount 함수 테스트", () => {
    it("좋아요 등록", async () => {
      loginStatus = true;
      axiosMock.post.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "test",
        })
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deleteOrPostLikecount();
      });
      expect(result.current.likelist).toEqual([1]);
    });

    it("좋아요 취소", async () => {
      axiosMock.delete.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: "test",
        })
      );
      postDetailMock.likelist.push(1);
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deleteOrPostLikecount();
      });
      expect(result.current.likelist).toEqual([]);
    });

    it("오류 발생", async () => {
      window.alert = jest.fn();
      axiosMock.delete.mockImplementation(() =>
        Promise.reject({status: 500, data: "에러발생"})
      );
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deleteOrPostLikecount();
      });
      expect(window.alert).toBeCalledWith(
        "에러가 발생했습니다 다시 시도해보세요"
      );
    });

    it("로그인 하지 않음", async () => {
      loginStatus = false;
      window.alert = jest.fn();
      const {result} = renderHook(() => usePostDetail(postDetailMock), {
        wrapper,
      });
      await act(async () => {
        await result.current.deleteOrPostLikecount();
      });
      expect(window.alert).toBeCalledWith("로그인을 진행해주세요");
    });
  });
});
