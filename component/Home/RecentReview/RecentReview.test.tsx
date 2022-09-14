import {fireEvent, render, screen} from "@testing-library/react";
import RecentReview from "./RecentReview";

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

describe("RecentReview Presentational 테스트", () => {
  it("로딩중", () => {
    const utils = render(
      <RecentReview
        serverData={{loading: true, error: false}}
        moveTargetStore={jest.fn()}
      />
    );
    screen.getByTestId("loading");
    expect(utils.container).toMatchSnapshot();
  });
  it("에러발생", () => {
    const utils = render(
      <RecentReview
        serverData={{loading: false, error: true}}
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
        serverData={{
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
