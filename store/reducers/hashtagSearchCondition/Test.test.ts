import hashtagSearchConditionSlice, {
  setCategory,
  setAdress,
  setMarkerClickStatus,
  addHashTag,
  deleteHashTag,
  initializeCondition,
  setKeyword,
} from "./Reducer";
import { HYDRATE } from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    category: "카페",
    adress: { content: "", mapClick: false, longitude: "", latitude: "" },
    hashtag: [],
    keyword: "",
  };
  it("initial state을 설정한 경우", () => {
    expect(hashtagSearchConditionSlice(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
  it("setCategory 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setCategory("식당")
    );
    expect(actual.category).toEqual("식당");
    expect(actual.hashtag).toEqual([]);
  });
  it("setAdress 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setAdress({
        adress: "testAdress",
        longitude: "testLongitude",
        latitude: "testLatitude",
      })
    );
    expect(actual.adress).toStrictEqual({
      content: "testAdress",
      mapClick: false,
      longitude: "testLongitude",
      latitude: "testLatitude",
    });
  });
  it("setMarkerClickStatus 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setMarkerClickStatus(true)
    );
    expect(actual.adress.mapClick).toEqual(true);
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
      { ...initialState, hashtag: ["test", "test2"] },
      deleteHashTag("test")
    );
    expect(actual.hashtag).toEqual(["test2"]);
  });

  it("initializeCondition 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      initializeCondition()
    );
    expect(actual).toEqual(initialState);
  });
  it("setKeyword 액션이 발생한 경우", () => {
    const actual = hashtagSearchConditionSlice(
      initialState,
      setKeyword("test")
    );
    expect(actual.keyword).toEqual("test");
  });
  it("HYDRATE 테스트", () => {
    expect(
      hashtagSearchConditionSlice(initialState, { type: HYDRATE })
    ).toEqual(initialState);
  });
});
