import hashtagSearchConditionSlice, {
  setPosition,
  setCategory,
  addHashTag,
  deleteHashTag,
  setKeyword,
  initializeHashtag,
  initializeKeyword,
} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    position: {},
    category: "카페",
    hashtag: [],
  };
  it("initial state을 설정한 경우", () => {
    expect(hashtagSearchConditionSlice(undefined, {type: "unknown"})).toEqual(
      initialState
    );
  });
  it("setPosition 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setPosition({
        address: "testAddress",
        longitude: "testLongitude",
        latitude: "testLatitude",
      })
    );
    expect(actual.category).toEqual("카페");
    expect(actual.hashtag).toEqual([]);
  });
  it("setCategory 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setCategory("식당")
    );
    expect(actual.category).toEqual("식당");
    expect(actual.hashtag).toEqual([]);
  });

  it("addHashTag 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      addHashTag("test")
    );
    expect(actual.hashtag).toEqual(["test"]);
  });
  it("deleteHashTag 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      {...initialState, hashtag: ["test", "test2"]},
      deleteHashTag("test")
    );
    expect(actual.hashtag).toEqual(["test2"]);
  });
  it("setKeyword 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setKeyword("test")
    );
    expect(actual.keyword).toEqual("test");
  });

  it("initializeHashtag 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      initializeHashtag()
    );
    expect(actual).toEqual({category: "카페", position: {}, hashtag: []});
  });

  it("initializeKeyword 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      initializeKeyword()
    );
    expect(actual).toEqual({keyword: "", position: {}});
  });

  it("HYDRATE 테스트", () => {
    expect(hashtagSearchConditionSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
