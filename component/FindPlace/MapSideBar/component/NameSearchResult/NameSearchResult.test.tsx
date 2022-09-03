import {render, screen} from "@testing-library/react";
import NameSearchResult from "./NameSearchResut";

describe("NameSearchResult Presentational 테스트", () => {
  it("로딩중", () => {
    const utils = render(
      <NameSearchResult
        searchResult={{loading: true, error: false}}
        showStoreInfo={jest.fn()}
      ></NameSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("loading");
  });
  it("에러발생", () => {
    const utils = render(
      <NameSearchResult
        searchResult={{loading: false, error: true}}
        showStoreInfo={jest.fn()}
      ></NameSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("error");
  });
  it("컨텐츠 없음", () => {
    const utils = render(
      <NameSearchResult
        searchResult={{loading: false, error: false}}
        showStoreInfo={jest.fn()}
      ></NameSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("noResult");
  });
  it("컨텐츠 있음", () => {
    const utils = render(
      <NameSearchResult
        searchResult={{
          content: [
            {
              id: 1,
              name: "testName",
              category: "testCategory",
              latitude: "testLatitude",
              longitude: "testLongitude",
              dist: 1,
              hashtag: {
                testHashtag: 1,
              },
            },
          ],
          loading: false,
          error: false,
        }}
        showStoreInfo={jest.fn()}
      ></NameSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("result");
  });
});
