import SearchTypeSlice, {
  setDesktopSearch,
  setDesktopStoreInfo,
  setMobileSearchStoreInfo,
} from "./Reducer";
import {HYDRATE} from "next-redux-wrapper";

describe("reducer 테스트", () => {
  const initialState = {
    desktop: {search: false, storeInfo: false},
    mobile: {searchStoreInfo: true},
  };

  it("initial state을 설정한 경우", () => {
    expect(SearchTypeSlice(undefined, {type: "unknown"})).toEqual(initialState);
  });

  it("setDesktopSearch 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(initialState, setDesktopSearch());
    expect(actual.desktop.search).toEqual(true);
  });

  it("setMobileSearchStoreInfo 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(initialState, setDesktopStoreInfo(true));
    expect(actual.desktop.storeInfo).toEqual(true);
  });

  it("setMobileSearchStoreInfo 액션이 발생한 경우", () => {
    const actual = SearchTypeSlice(initialState, setMobileSearchStoreInfo());
    expect(actual.mobile.searchStoreInfo).toEqual(false);
  });

  it("HYDRATE 테스트", () => {
    expect(SearchTypeSlice(initialState, {type: HYDRATE})).toEqual(
      initialState
    );
  });
});
