import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import useTagSearchResult from "./TagSearchResultHook";
import TagSearchResult from "./TagSearchResult";

const mockStore = configureMockStore()({
  searchResult: {},
  hashtagSearchCondition: {},
});
const wrapper = ({children}: any) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe("TagSearchResult Hook 테스트", () => {
  it("showStoreInfo 함수 테스트", () => {
    const {result} = renderHook(() => useTagSearchResult(), {
      wrapper,
    });
    act(() => {
      result.current.showStoreInfo(1);
    });
    expect(mockStore.getActions()[0]).toEqual({
      payload: 1,
      type: "storeInfo/getStoreInfo",
    });
  });
  it("moveSearhPage 함수 테스트", () => {
    const {result} = renderHook(() => useTagSearchResult(), {
      wrapper,
    });
    act(() => {
      result.current.moveSearhPage();
    });
    expect(mockStore.getActions()[1]).toEqual({
      payload: "hashtagSearch",
      type: "searchType/setSearchType",
    });
  });
});

describe("TagSearchResult Presentational 테스트", () => {
  it("로딩중", () => {
    const moveSearhPageMock = jest.fn();
    const showStoreInfoMock = jest.fn();
    const utils = render(
      <TagSearchResult
        moveSearhPage={moveSearhPageMock}
        searchResult={{loading: true, error: false}}
        searchCondition={{
          category: "testCategory",
          position: {
            address: "testAddress",
            longitude: "testLongitude",
            latitude: "testLatitude",
          },
          hashtag: ["testHashtag"],
          keyword: "testKeyword",
        }}
        showStoreInfo={showStoreInfoMock}
      ></TagSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("loading");
  });
  it("에러발생", () => {
    const moveSearhPageMock = jest.fn();
    const showStoreInfoMock = jest.fn();
    const utils = render(
      <TagSearchResult
        moveSearhPage={moveSearhPageMock}
        searchResult={{loading: false, error: true}}
        searchCondition={{
          category: "testCategory",
          position: {
            address: "testAddress",
            longitude: "testLongitude",
            latitude: "testLatitude",
          },
          hashtag: ["testHashtag"],
          keyword: "testKeyword",
        }}
        showStoreInfo={showStoreInfoMock}
      ></TagSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("error");
  });
  it("컨텐츠 없음", () => {
    const moveSearhPageMock = jest.fn();
    const showStoreInfoMock = jest.fn();
    const utils = render(
      <TagSearchResult
        moveSearhPage={moveSearhPageMock}
        searchResult={{content: [], loading: false, error: false}}
        searchCondition={{
          category: "testCategory",
          position: {
            address: "testAddress",
            longitude: "testLongitude",
            latitude: "testLatitude",
          },
          hashtag: ["testHashtag"],
          keyword: "testKeyword",
        }}
        showStoreInfo={showStoreInfoMock}
      ></TagSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    screen.getByTestId("noResult");
  });
  it("컨텐츠 있음", () => {
    const moveSearhPageMock = jest.fn();
    const showStoreInfoMock = jest.fn();
    const utils = render(
      <TagSearchResult
        moveSearhPage={moveSearhPageMock}
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
          error: true,
        }}
        searchCondition={{
          category: "testCategory",
          position: {
            address: "testAddress",
            longitude: "testLongitude",
            latitude: "testLatitude",
          },
          hashtag: ["testHashtag"],
          keyword: "testKeyword",
        }}
        showStoreInfo={showStoreInfoMock}
      ></TagSearchResult>
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("moveSearhPage"));
    expect(moveSearhPageMock).toBeCalledTimes(1);
  });
});
