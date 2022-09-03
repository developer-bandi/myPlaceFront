import {act, render, renderHook, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import {useRouter} from "next/router";
import MyPost from "./MyPost";
import useMyPost from "./MyPostHook";

jest.mock("axios");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const routerMock = {
  pathname: "",
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(routerMock);
const axiosMock = axios as jest.Mocked<typeof axios>;
const postListcontentMock = {
  count: 1,
  rows: [
    {
      id: 1,
      title: "testTitle",
      content: "testContent",
      nickname: "testNickname",
      viewCount: 1,
      createdAt: "testCreatedAt",
      postlikecount: 1,
      comment: 1,
    },
  ],
};

describe("myComment Presentational test", () => {
  describe("데스크톱 일 경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyPost
          postListState={{
            loading: true,
            error: false,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("loading");
    });
    it("에러발생", () => {
      const utils = render(
        <MyPost
          postListState={{
            loading: false,
            error: true,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("error");
    });
    it("결과 없음", () => {
      const utils = render(
        <MyPost
          postListState={{
            content: {count: 0, rows: []},
            loading: false,
            error: false,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("noResult");
    });
    it("정상 출력", () => {
      const utils = render(
        <MyPost
          postListState={{
            content: postListcontentMock,
            loading: false,
            error: false,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={false}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("result");
    });
  });
  describe("노트북 사이즈 이하일 경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyPost
          postListState={{
            loading: true,
            error: false,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("loading");
    });
    it("에러발생", () => {
      const utils = render(
        <MyPost
          postListState={{
            loading: false,
            error: true,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("error");
    });
    it("결과 없음", () => {
      const utils = render(
        <MyPost
          postListState={{
            content: {count: 0, rows: []},
            loading: false,
            error: false,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("noResult");
    });
    it("정상 출력", () => {
      const utils = render(
        <MyPost
          postListState={{
            content: postListcontentMock,
            loading: false,
            error: false,
          }}
          movePostDetailPage={jest.fn()}
          page={1}
          changePage={jest.fn()}
          isLabtopOrTabletOrMobile={true}
        />
      );
      expect(utils.container).toMatchSnapshot();
      screen.getByTestId("result");
    });
  });
});

describe("MyPost Hook 테스트", () => {
  it("movePostDetailPage 함수 테스트", () => {
    const {result} = renderHook(() => useMyPost());
    act(() => {
      result.current.movePostDetailPage(1);
    });
    expect(routerMock.push).toBeCalledWith("/community/postdetail/1");
  });
});
