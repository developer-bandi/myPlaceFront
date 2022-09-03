import {fireEvent, render, screen} from "@testing-library/react";
import StoreRank from "./StoreRank";

const StoreRankMockArr = new Array(10).fill(0).map((data, index) => {
  return {
    id: index + 1,
    name: "testName",
    address: "testAddress",
    viewCount: 1,
    bookmark: 1,
    review: 1,
    latitude: "testLatitude",
    longitude: "testLongitude",
  };
});

describe("StoreRank Presentational 테스트", () => {
  it("에러발생", () => {
    const utils = render(
      <StoreRank
        storeRankData={{error: true}}
        moveTargetStore={jest.fn()}
        renewTime={"testRenewTime"}
      />
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("error");
  });
  it("정상 출력", () => {
    const moveTargetStoreMock = jest.fn();
    const utils = render(
      <StoreRank
        storeRankData={{
          content: StoreRankMockArr,
          error: false,
        }}
        moveTargetStore={moveTargetStoreMock}
        renewTime={"testRenewTime"}
      />
    );
    screen.getByTestId("result");
    fireEvent.click(screen.getByTestId("moveTargetStore0"));
    expect(utils.container).toMatchSnapshot();
    expect(moveTargetStoreMock).toBeCalledTimes(1);
  });
});
