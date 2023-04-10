import HashtagAllSlice, {
  getHashtagAll,
  getHashtagAllSuccess,
  getHashtagAllFailure,
} from "./Reducer";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { throwError } from "redux-saga-test-plan/providers";
import { hashtagAllSaga } from "./Saga";
import { HYDRATE } from "next-redux-wrapper";
import { getHashTag } from "../../../api/hashtag";

const apiData = new Array(10).fill(0).map(() => {
  return {
    category: "카페",
    subject: "testSubject",
    name: "testName",
    id: 0,
    viewCount: 0,
  };
});

describe("reducer 테스트", () => {
  const initialState = {
    loading: false,
    error: false,
  };
  it("initial state을 설정한 경우", () => {
    expect(HashtagAllSlice(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
  it("getHashtagAll액션이 발생한 경우", () => {
    const actual = HashtagAllSlice(initialState, getHashtagAll());
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(false);
  });
  it("getHashtagAllSuccess액션이 발생한 경우", () => {
    const actual = HashtagAllSlice(initialState, getHashtagAllSuccess(apiData));
    expect(actual.content).toStrictEqual({
      식당: {},
      주점: {},
      카페: {
        testSubject: apiData.map((data) => {
          return [data.name, data.viewCount, data.id];
        }),
      },
    });
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(false);
  });
  it("getHashtagAllFailure액션이 발생한 경우", () => {
    const actual = HashtagAllSlice(initialState, getHashtagAllFailure());
    expect(actual.content).toEqual(undefined);
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(true);
  });
  describe("HYDRATE 테스트", () => {
    it("서버에서 데이터를 로드한 경우", () => {
      const actual = HashtagAllSlice(initialState, {
        type: HYDRATE,
        payload: {
          hashtagAll: { content: "test", loading: false, error: false },
        },
      });
      expect(actual).toEqual({ content: "test", loading: false, error: false });
    });
    it("에러가 발생한 경우", () => {
      const actual = HashtagAllSlice(initialState, {
        type: HYDRATE,
        payload: {
          hashtagAll: { content: "test", loading: false, error: true },
        },
      });
      expect(actual).toEqual({
        loading: false,
        error: false,
      });
    });
  });
});

describe("saga 테스트", () => {
  describe("hashtagAllSaga가 의도한대로 작동하는지", () => {
    it("api 를 성공적으로 받아와 액션을 발생시킨 경우", () => {
      return expectSaga(hashtagAllSaga)
        .provide([[call(getHashTag), { data: apiData }]])
        .put({ type: "hashtagAll/getHashtagAllSuccess", payload: apiData })
        .dispatch({ type: "hashtagAll/getHashtagAll" })
        .silentRun();
    });
    it("에러가 발생한 경우", () => {
      return expectSaga(hashtagAllSaga)
        .provide([[call(getHashTag), throwError(new Error("Whoops"))]])
        .put({ type: "hashtagAll/getHashtagAllFailure", payload: undefined })
        .dispatch({ type: "hashtagAll/getHashtagAll" })
        .silentRun();
    });
  });
});
