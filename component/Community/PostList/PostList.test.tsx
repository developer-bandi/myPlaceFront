import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import usePostList from "./PostListHook";
import configureMockStore from "redux-mock-store";
import { useRouter } from "next/router";
import PostList from "./PostList";
import { ReactNode } from "react";

jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const axiosMock = axios as jest.Mocked<typeof axios>;
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

// describe("PostList Presentational Test", () => {
//   it("로딩중", () => {
//     const utils = render(
//       <PostList
//         page={1}
//         postList={{loading: true, error: false}}
//         changeSort={jest.fn()}
//         changePage={jest.fn()}
//         selectedSort={"char"}
//         searchRef={{current: null}}
//         searchPost={jest.fn()}
//         initializeSearch={jest.fn()}
//         moveWritePage={jest.fn()}
//         movePostDetailPage={jest.fn()}
//       />
//     );
//     expect(utils.container).toMatchSnapshot();
//     screen.getByTestId("loading");
//   });
//   it("에러 발생", () => {
//     const utils = render(
//       <PostList
//         page={1}
//         postList={{loading: false, error: true}}
//         changeSort={jest.fn()}
//         changePage={jest.fn()}
//         selectedSort={"char"}
//         searchRef={{current: null}}
//         searchPost={jest.fn()}
//         initializeSearch={jest.fn()}
//         moveWritePage={jest.fn()}
//         movePostDetailPage={jest.fn()}
//       />
//     );
//     expect(utils.container).toMatchSnapshot();
//     screen.getByText("서버에 에러가 발생하였습니다");
//   });
//   it("정상출력", () => {
//     const changeSortMock = jest.fn();
//     const searchPostMock = jest.fn();
//     const initializeSearchMock = jest.fn();
//     const moveWritePageMock = jest.fn();
//     const movePostDetailPageMock = jest.fn();

//     const utils = render(
//       <PostList
//         page={1}
//         postList={{content: postListMock, loading: false, error: false}}
//         changeSort={changeSortMock}
//         changePage={jest.fn()}
//         selectedSort={"char"}
//         searchRef={{current: null}}
//         searchPost={searchPostMock}
//         initializeSearch={initializeSearchMock}
//         moveWritePage={moveWritePageMock}
//         movePostDetailPage={movePostDetailPageMock}
//       />
//     );
//     expect(utils.container).toMatchSnapshot();
//     fireEvent.click(screen.getByTestId("searchButton"));
//     fireEvent.click(screen.getByTestId("initializeButton"));
//     fireEvent.click(screen.getByTestId("createdAtsortButton"));
//     fireEvent.click(screen.getByTestId("writeButton"));
//     fireEvent.click(screen.getByTestId("articleButton0"));
//     expect(searchPostMock).toBeCalledTimes(1);
//     expect(initializeSearchMock).toBeCalledTimes(1);
//     expect(changeSortMock).toBeCalledTimes(1);
//     expect(moveWritePageMock).toBeCalledTimes(1);
//     expect(movePostDetailPageMock).toBeCalledTimes(1);
//   });
// });

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
        axiosMock.get.mockImplementation(() =>
          Promise.resolve({ status: 200, data: postListMock })
        );
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
        expect(axiosMock.get.mock.calls[0][0]).toBe(
          `${
            process.env.NEXT_PUBLIC_SERVER_DOMAIN
          }/post/search?keyword=${"test"}&page=${1}&order=${"likeCount"}`
        );
        expect(result.current.page).toBe(1);
      });
      it("검색 키워드가 없는 경우", async () => {
        axiosMock.get.mockImplementation(() =>
          Promise.resolve({ status: 200, data: postListMock })
        );
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
        expect(axiosMock.get.mock.calls[1][0]).toBe(
          `${
            process.env.NEXT_PUBLIC_SERVER_DOMAIN
          }/post/list?page=${1}&order=${"likeCount"}`
        );
        expect(result.current.page).toBe(1);
      });
    });
    it("에러가 발생한 경우", async () => {
      axiosMock.get.mockImplementation(() =>
        Promise.reject({ status: 500, data: "에러발생" })
      );
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
        axiosMock.get.mockImplementation(() =>
          Promise.resolve({ status: 200, data: postListMock })
        );
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
        expect(axiosMock.get.mock.calls[3][0]).toBe(
          `${
            process.env.NEXT_PUBLIC_SERVER_DOMAIN
          }/post/search?keyword=${"test"}&page=${2}&order=${"createdAt"}`
        );
        expect(result.current.page).toBe(2);
      });
      it("검색 키워드가 없는 경우", async () => {
        axiosMock.get.mockImplementation(() =>
          Promise.resolve({ status: 200, data: postListMock })
        );
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
        expect(axiosMock.get.mock.calls[4][0]).toBe(
          `${
            process.env.NEXT_PUBLIC_SERVER_DOMAIN
          }/post/list?page=${2}&order=${"createdAt"}`
        );
        expect(result.current.page).toBe(2);
      });
    });
    it("에러가 발생한 경우", async () => {
      axiosMock.get.mockImplementation(() =>
        Promise.reject({ status: 500, data: "에러발생" })
      );
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
      axiosMock.get.mockImplementation(() =>
        Promise.resolve({ status: 200, data: postListMock })
      );
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
      axiosMock.get.mockImplementation(() =>
        Promise.resolve({ status: 200, data: postListMock })
      );
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
      axiosMock.get.mockImplementation(() =>
        Promise.reject({ status: 500, data: "에러발생" })
      );
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
