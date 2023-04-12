import SearchResultSlice, {
  searchStore,
  searchStoreSuccess,
  searchStoreFailure,
} from "./Reducer";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { throwError } from "redux-saga-test-plan/providers";
import { HYDRATE } from "next-redux-wrapper";
import { searchResultSaga } from "./Saga";
import { hashtagSearch, nameSearch } from "../../../api/search";

const apiData = new Array(10).fill(0).map(() => {
  return {
    id: 1,
    name: "test",
    category: "testCategory",
    latitude: "testLatitude",
    longitude: "testLongitude",
    dist: 1,
    hashtag: {
      test: 10,
    },
  };
});

describe("reducer 테스트", () => {
  const initialState = {
    loading: false,
    error: false,
  };

  it("initial state을 설정한 경우", () => {
    expect(SearchResultSlice(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
  it("searchStore 액션이 발생한 경우", () => {
    const actual = SearchResultSlice(
      initialState,
      searchStore({
        latitude: "testLatitude",
        longitude: "testLongitude",
        selectedHashtag: ["test"],
      })
    );
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(false);
  });
  it("searchStoreSuccess 액션이 발생한 경우", () => {
    const actual = SearchResultSlice(initialState, searchStoreSuccess(apiData));
    expect(actual.content).toStrictEqual(apiData);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
  it("getHashtagRankFailure 액션이 발생한 경우", () => {
    const actual = SearchResultSlice(initialState, searchStoreFailure());
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(true);
  });
  it("HYDRATE 테스트", () => {
    const actual = SearchResultSlice(initialState, { type: HYDRATE });
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
});

describe("saga 테스트", () => {
  describe("getSearchResult가 의도한대로 작동하는지", () => {
    const payloadDataHashtag = {
      latitude: "testLatitude",
      longitude: "testLongitude",
      selectedHashtag: ["test"],
    };

    const payloadDataKeyword = {
      latitude: "testLatitude",
      longitude: "testLongitude",
      searchKeyword: "testKeyword",
    };

    it("hashtag로 검색한 결과를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(searchResultSaga)
        .provide([[call(hashtagSearch, payloadDataHashtag), { data: apiData }]])
        .put({ type: "searchResult/searchStoreSuccess", payload: apiData })
        .dispatch({
          type: "searchResult/searchStore",
          payload: payloadDataHashtag,
        })
        .silentRun();
    });
    it("keyword로 검색한 결과를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(searchResultSaga)
        .provide([[call(nameSearch, payloadDataKeyword), { data: apiData }]])
        .put({ type: "searchResult/searchStoreSuccess", payload: apiData })
        .dispatch({
          type: "searchResult/searchStore",
          payload: payloadDataKeyword,
        })
        .silentRun();
    });
    it("에러가 발생한 경우", () => {
      return expectSaga(searchResultSaga)
        .provide([
          [
            call(hashtagSearch, payloadDataHashtag),
            throwError(new Error("Whoops")),
          ],
        ])
        .put({ type: "searchResult/searchStoreFailure", payload: undefined })
        .dispatch({ type: "searchResult/searchStore" })
        .silentRun();
    });
  });
});
