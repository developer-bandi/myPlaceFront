import SearchTypeSlice, {setSearchType} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {type: "hashtagSearch"};

  it("initial state을 설정한 경우", () => {
    expect(SearchTypeSlice(undefined, {type: "unknown"})).toEqual(initialState);
  });

  it("setSearchType 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(
      initialState,
      setSearchType("keywordSearchResult")
    );
    expect(actual.type).toEqual("keywordSearchResult");
  });

  it("HYDRATE 테스트", () => {
    expect(SearchTypeSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
