import {fireEvent, render, screen} from "@testing-library/react";
import MyBookMark from "./MyBookMark";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => {
    return {
      pathname: "test",
    };
  }),
}));

const bookmarkContentMock = {
  count: 10,
  rows: new Array(10).fill(0).map((data, index) => {
    return {
      id: index + 1,
      name: "test",
      latitude: "test",
      longitude: "test",
      address: "test",
      category: "test",
      viewCount: 1,
      bookmark: 1,
      review: 1,
    };
  }),
};

describe("MyBookMark Presentational 테스트", () => {
  describe("데스크톱 일 경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{loading: true, error: false}}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={false}
          page={1}
          changePage={jest.fn()}
        />
      );
      screen.getByTestId("loading");
      expect(utils.container).toMatchSnapshot();
    });

    it("에러발생", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{loading: false, error: true}}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={false}
          page={1}
          changePage={jest.fn()}
        />
      );
      screen.getByTestId("error");
      expect(utils.container).toMatchSnapshot();
    });

    it("결과 없음", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{
            content: {count: 0, rows: []},
            loading: false,
            error: false,
          }}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={false}
          page={1}
          changePage={jest.fn()}
        />
      );
      screen.getByTestId("noResult");
      expect(utils.container).toMatchSnapshot();
    });

    it("정상 출력", () => {
      const moveTargetStoreMock = jest.fn();
      const utils = render(
        <MyBookMark
          bookMarkState={{
            content: bookmarkContentMock,
            loading: false,
            error: false,
          }}
          moveTargetStore={moveTargetStoreMock}
          isLabtopOrTabletOrMobile={false}
          page={1}
          changePage={jest.fn()}
        />
      );
      screen.getByTestId("result");
      fireEvent.click(screen.getByTestId("moveTargetStore0"));
      expect(utils.container).toMatchSnapshot();
      expect(moveTargetStoreMock).toBeCalledTimes(1);
    });
  });
  describe("노트북사이즈 이하일 경우", () => {
    it("로딩중", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{loading: true, error: false}}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={true}
          page={1}
          changePage={jest.fn()}
        />
      );
      expect(utils.container).toMatchSnapshot();
    });

    it("에러발생", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{loading: false, error: true}}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={true}
          page={1}
          changePage={jest.fn()}
        />
      );
      expect(utils.container).toMatchSnapshot();
    });

    it("결과 없음", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{
            content: {count: 0, rows: []},
            loading: false,
            error: false,
          }}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={true}
          page={1}
          changePage={jest.fn()}
        />
      );
      expect(utils.container).toMatchSnapshot();
    });

    it("정상 출력", () => {
      const utils = render(
        <MyBookMark
          bookMarkState={{
            content: bookmarkContentMock,
            loading: false,
            error: false,
          }}
          moveTargetStore={jest.fn()}
          isLabtopOrTabletOrMobile={true}
          page={1}
          changePage={jest.fn()}
        />
      );
      expect(utils.container).toMatchSnapshot();
    });
  });
});
