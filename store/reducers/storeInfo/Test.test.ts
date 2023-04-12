import SearchResultSlice, {
  getStoreInfo,
  getStoreInfoSuccess,
  setBookmark,
  initializeStoreInfo,
} from "./Reducer";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { throwError } from "redux-saga-test-plan/providers";
import { HYDRATE } from "next-redux-wrapper";
import { storeInfoSaga } from "./Saga";
import { getStoreDetailInfo } from "../../../api/search";

const apiData = {
  bookmark: false,
  storeInfo: {
    id: 1,
    name: "test",
    tel: "000-000-0000",
    openingHours: "test",
    address: "test",
    category: "test",
    updatedAt: "test",
    latitude: "test",
    longitude: "test",
  },
  Reviews: [
    {
      content: "test",
      user: "test",
      date: "test",
      Hashtags: ["test"],
      photos: ["test"],
    },
  ],
  hashtags: {
    test: 1,
  },
  mainPhoto: "test",
  Menus: ["test"],
};

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
  it("getStoreInfo 액션이 발생한 경우", () => {
    const actual = SearchResultSlice(initialState, getStoreInfo(1));
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(false);
  });
  it("getStoreInfoSuccess 액션이 발생한 경우", () => {
    const actual = SearchResultSlice(
      initialState,
      getStoreInfoSuccess(apiData)
    );
    expect(actual.content).toStrictEqual(apiData);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
  it("setBookmark 액션이 발생한 경우", () => {
    const actual = SearchResultSlice(
      { ...initialState, content: apiData },
      setBookmark(true)
    );
    expect(actual.content?.bookmark).toEqual(true);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
  it("initializeStoreInfo 액션이 발생한 경우", () => {
    expect(
      SearchResultSlice(
        { ...initialState, content: apiData },
        initializeStoreInfo()
      )
    ).toEqual(initialState);
  });
  it("HYDRATE 테스트", () => {
    const actual = SearchResultSlice(initialState, { type: HYDRATE });
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
});

describe("saga 테스트", () => {
  describe("storeInfoSaga가 의도한대로 작동하는지", () => {
    it("api를 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(storeInfoSaga)
        .provide([[call(getStoreDetailInfo, 1), { data: apiData }]])
        .put({ type: "storeInfo/getStoreInfoSuccess", payload: apiData })
        .dispatch({
          type: "storeInfo/getStoreInfo",
          payload: 1,
        })
        .silentRun();
    });
    it("에러가 발생한 경우", () => {
      return expectSaga(storeInfoSaga)
        .provide([
          [call(getStoreDetailInfo, 1), throwError(new Error("Whoops"))],
        ])
        .put({ type: "storeInfo/getStoreInfoFailure", payload: undefined })
        .dispatch({
          type: "storeInfo/getStoreInfo",
          payload: "1",
        })
        .silentRun();
    });
  });
});
