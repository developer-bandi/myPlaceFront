import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import useTagSearchResult from "./TagSearchResultHook";

const mockStore = configureMockStore()({
  searchResult: {},
  hashtagSearchCondition: {},
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe("TagSearchResult Hook 테스트", () => {
  it("showStoreInfo 함수 테스트", () => {
    const { result } = renderHook(() => useTagSearchResult(), {
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
    const { result } = renderHook(() => useTagSearchResult(), {
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
