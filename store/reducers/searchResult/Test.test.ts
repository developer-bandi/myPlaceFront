import SearchResultSlice, {
  searchStore,
  searchStoreSuccess,
  searchStoreFailure,
} from "./Reducer";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { throwError } from "redux-saga-test-plan/providers";
import {
  axiosGetHashTagRank,
  axiosHashtagSearch,
  axiosNameSearch,
} from "../../../lib/commonFn/api";
import { HYDRATE } from "next-redux-wrapper";
import { searchResultSaga } from "./Saga";

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
  describe("hashtagRankSaga가 의도한대로 작동하는지", () => {
    const payloadData = {
      latitude: "testLatitude",
      longitude: "testLongitude",
      selectedHashtag: ["test"],
      searchKeyword: "testKeyword",
    };
    it("hashtag로 검색한 결과를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(searchResultSaga)
        .provide([
          [
            call(
              axiosHashtagSearch,
              payloadData.latitude,
              payloadData.longitude,
              payloadData.selectedHashtag
            ),
            { data: apiData },
          ],
        ])
        .put({ type: "searchResult/searchStoreSuccess", payload: apiData })
        .dispatch({
          type: "searchResult/searchStore",
          payload: {
            latitude: payloadData.latitude,
            longitude: payloadData.longitude,
            selectedHashtag: payloadData.selectedHashtag,
          },
        })
        .silentRun();
    });
    it("keyword로 검색한 결과를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(searchResultSaga)
        .provide([
          [
            call(
              axiosNameSearch,
              payloadData.latitude,
              payloadData.longitude,
              payloadData.searchKeyword
            ),
            { data: apiData },
          ],
        ])
        .put({ type: "searchResult/searchStoreSuccess", payload: apiData })
        .dispatch({
          type: "searchResult/searchStore",
          payload: {
            latitude: payloadData.latitude,
            longitude: payloadData.longitude,
            searchKeyword: payloadData.searchKeyword,
          },
        })
        .silentRun();
    });
    it("에러가 발생한 경우", () => {
      return expectSaga(searchResultSaga)
        .provide([[call(axiosGetHashTagRank), throwError(new Error("Whoops"))]])
        .put({ type: "searchResult/searchStoreFailure", payload: undefined })
        .dispatch({ type: "searchResult/searchStore" })
        .silentRun();
    });
  });
});
