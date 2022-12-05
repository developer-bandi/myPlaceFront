import useTagSearch from "./TagSearchHook";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";

const mockStore = configureMockStore()({
  searchCondition: {
    position: {
      address: "testAddress",
      longitude: "testLongitude",
      latitude: "testLatitude",
    },
    category: "testCategory",
    hashtag: ["testHashtag"],
    keyword: "testKeyword",
  },
  hashtagAll: {},
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);
describe("TagSearch Hook 테스트", () => {
  it("useEffect 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({ current: { value: "test" } });
    const { result } = renderHook(() => useTagSearch(), {
      wrapper,
    });
    expect(result.current.inputRef.current).toEqual({ value: "testAddress" });
  });
  describe("dispatchHashtag 함수 테스트", () => {
    it("추가하는 경우", () => {
      const { result } = renderHook(() => useTagSearch(), {
        wrapper,
      });
      act(() => {
        result.current.dispatchHashtag("testHashtag2");
      });
      expect(mockStore.getActions()[0]).toEqual({
        payload: "testHashtag2",
        type: "searchCondition/addHashTag",
      });
    });
    it("삭제하는 경우", () => {
      const { result } = renderHook(() => useTagSearch(), {
        wrapper,
      });
      act(() => {
        result.current.dispatchHashtag("testHashtag");
      });
      expect(mockStore.getActions()[1]).toEqual({
        payload: "testHashtag",
        type: "searchCondition/deleteHashTag",
      });
    });
  });
  it("dispatchCategory 함수 테스트", () => {
    const { result } = renderHook(() => useTagSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchCategory("testCategory");
    });
    expect(mockStore.getActions()[2]).toEqual({
      payload: "testCategory",
      type: "searchCondition/setCategory",
    });
  });
  it("dispatchAddress 함수 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({ current: { value: "test" } });
    const { result } = renderHook(() => useTagSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchAddress();
    });
    expect(mockStore.getActions()[3]).toEqual({
      payload: {
        address: "testAddress",
      },
      type: "searchCondition/setPosition",
    });
  });
  it("dispatchSearchStore 함수 테스트", () => {
    const { result } = renderHook(() => useTagSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchSearchStore();
    });
    expect(mockStore.getActions()[4]).toEqual({
      payload: {
        latitude: "testLatitude",
        longitude: "testLongitude",
        selectedHashtag: ["testHashtag"],
      },
      type: "searchResult/searchStore",
    });
    expect(mockStore.getActions()[5]).toEqual({
      payload: "hashtagResult",
      type: "searchType/setSearchType",
    });
  });
});
