import {act, render, renderHook, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {useRouter} from "next/router";
import useMyComment from "./MyCommentHook";
import MyComment from "./MyComment";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const commentListStateMock = {
  count: 1,
  rows: [
    {
      id: 1,
      content: "test",
      createdAt: "test",
      PostId: 1,
      nickname: "test",
    },
  ],
};

describe("myComment Hook test", () => {
  const store = configureMockStore()({});
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <Provider store={store}>{children}</Provider>
  );
  describe("searchStoreInfo 함수 test", () => {
    it("일반적인 흐름", () => {
      const mockRouter = {
        push: jest.fn(),
      };
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      const {result} = renderHook(() => useMyComment(), {
        wrapper,
      });

      act(() => {
        result.current.movePostDetailPage(1);
      });

      expect(mockRouter.push).toBeCalledWith("/community/postdetail/1");
    });
  });
});

describe("myComment Presentational test", () => {
  describe("데스크톱 일 경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyComment
          commentListState={{loading: true, error: false}}
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
        <MyComment
          commentListState={{loading: false, error: true}}
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
        <MyComment
          commentListState={{
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
        <MyComment
          commentListState={{
            content: commentListStateMock,
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
        <MyComment
          commentListState={{loading: true, error: false}}
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
        <MyComment
          commentListState={{loading: false, error: true}}
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
        <MyComment
          commentListState={{
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
        <MyComment
          commentListState={{
            content: commentListStateMock,
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
