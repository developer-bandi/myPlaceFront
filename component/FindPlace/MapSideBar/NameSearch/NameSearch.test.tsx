import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import useNameSearch from "./NameSearchHook";
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
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe("NameSearch Hook 테스트", () => {
  it("처음 useEffect 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({ current: { value: "test" } })
      .mockReturnValueOnce({ current: { value: "test" } });
    const { result } = renderHook(() => useNameSearch(), {
      wrapper,
    });
    expect(result.current.addressInputRef).toEqual({
      current: { value: "testAddress" },
    });
    expect(result.current.searchKeywordInputRef).toEqual({
      current: { value: "testKeyword" },
    });
  });
  it("dispatchAddress함수 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({ current: { value: "test" } })
      .mockReturnValueOnce({ current: { value: "test" } });
    const { result } = renderHook(() => useNameSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchAddress();
    });
    expect(mockStore.getActions()[0]).toEqual({
      payload: {
        address: "testAddress",
      },
      type: "searchCondition/setPosition",
    });
  });
  it("dispatchSearchStore함수 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({ current: { value: "test" } })
      .mockReturnValueOnce({ current: { value: "test" } });
    const { result } = renderHook(() => useNameSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchAddress();
    });
    expect(mockStore.getActions()[1]).toEqual({
      payload: {
        address: "testAddress",
      },
      type: "searchCondition/setPosition",
    });
  });
});
