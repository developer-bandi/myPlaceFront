import SearchTypeSlice, {
  changeDesktopFold,
  changeDesktopStoreInfoActive,
  changeMobileFold,
} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    desktop: {fold: false, storeInfoActive: false},
    mobile: {fold: true},
  };
  it("initial state을 설정한 경우", () => {
    expect(SearchTypeSlice(undefined, {type: "unknown"})).toEqual(initialState);
  });
  it("changeDesktopFold 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(initialState, changeDesktopFold());
    expect(actual.desktop.fold).toEqual(true);
  });
  it("changeDesktopStoreInfoActive 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(
      initialState,
      changeDesktopStoreInfoActive(true)
    );
    expect(actual.desktop.storeInfoActive).toEqual(true);
  });
  it("changeMobileFold 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(initialState, changeMobileFold());
    expect(actual.mobile.fold).toEqual(false);
  });
  it("HYDRATE 테스트", () => {
    expect(SearchTypeSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
