import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import axios from "axios";
import useRecentReview from "./RecentReviewHook";
import RecentReview from "./RecentReview";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const recentReviewMock = {
  count: 15,
  rows: new Array(10).fill(0).map((data, index) => {
    return {
      id: index + 1,
      content: "testContent",
      createdAt: "testCreatedAt",
      storeName: "testStoreName",
      storeAddress: "testStoreAddress",
      storeLatitude: "testStoreLatitude",
      storeLongitude: "testStoreLongitude",
      nickname: "testNickname",
      hashtag: ["testHashtag"],
    };
  }),
};

describe("RecentReview Hook 테스트", () => {
  const mockStore = configureMockStore()({});
  const wrapper = ({children}: any) => (
    <Provider store={mockStore}>{children}</Provider>
  );
  describe("데이터 로드 useEffect test", () => {
    it("정상적으로 받아오는 경우", () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: recentReviewMock,
        })
      );

      const {result} = renderHook(() => useRecentReview(), {
        wrapper,
      });

      waitFor(() => {
        expect(result.current.recentReviewData).toStrictEqual({
          content: recentReviewMock,
          loading: false,
          error: false,
        });
      });
    });

    it("에러가 발생한 경우", () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: "error",
        })
      );
      const {result} = renderHook(() => useRecentReview(), {
        wrapper,
      });

      waitFor(() => {
        expect(result.current.recentReviewData).toStrictEqual({
          loading: false,
          error: true,
        });
      });
    });
  });
});

describe("RecentReview Presentational 테스트", () => {
  it("로딩중", () => {
    const utils = render(
      <RecentReview
        recentReviewData={{loading: true, error: false}}
        moveTargetStore={jest.fn()}
      />
    );
    screen.getByTestId("loading");
    expect(utils.container).toMatchSnapshot();
  });
  it("에러발생", () => {
    const utils = render(
      <RecentReview
        recentReviewData={{loading: false, error: true}}
        moveTargetStore={jest.fn()}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("error");
  });
  it("정상 출력", () => {
    const moveTargetStoreMock = jest.fn();
    const utils = render(
      <RecentReview
        recentReviewData={{
          content: recentReviewMock,
          loading: false,
          error: false,
        }}
        moveTargetStore={moveTargetStoreMock}
      />
    );
    fireEvent.click(screen.getByTestId("moveTargetStore0"));
    screen.getByTestId("result");
    expect(utils.container).toMatchSnapshot();
    expect(moveTargetStoreMock).toBeCalledTimes(1);
  });
});
