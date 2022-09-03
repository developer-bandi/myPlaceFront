import useTagSearch from "./TagSearchHook";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import TagSearch from "./TagSearch";

const mockStore = configureMockStore()({
  hashtagSearchCondition: {
    adress: {
      content: "testAdress",
      latitude: "testLatitude",
      longitude: "testLongitude",
    },
    keyword: "testKeyword",
    hashtag: ["testHashtag"],
  },
  hashtagAll: {},
});
const wrapper = ({children}: any) => (
  <Provider store={mockStore}>{children}</Provider>
);
describe("TagSearch Hook 테스트", () => {
  it("useEffect 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({current: {value: "test"}});
    const {result} = renderHook(() => useTagSearch(), {
      wrapper,
    });
    expect(result.current.inputRef.current).toEqual({value: "testAdress"});
  });
  describe("dispatchHashtag 함수 테스트", () => {
    it("추가하는 경우", () => {
      const {result} = renderHook(() => useTagSearch(), {
        wrapper,
      });
      act(() => {
        result.current.dispatchHashtag("testHashtag2");
      });
      expect(mockStore.getActions()[0]).toEqual({
        payload: "testHashtag2",
        type: "hashtagSearchCondition/addHashTag",
      });
    });
    it("삭제하는 경우", () => {
      const {result} = renderHook(() => useTagSearch(), {
        wrapper,
      });
      act(() => {
        result.current.dispatchHashtag("testHashtag");
      });
      expect(mockStore.getActions()[1]).toEqual({
        payload: "testHashtag",
        type: "hashtagSearchCondition/deleteHashTag",
      });
    });
  });
  it("dispatchCategory 함수 테스트", () => {
    const {result} = renderHook(() => useTagSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchCategory("testCategory");
    });
    expect(mockStore.getActions()[2]).toEqual({
      payload: "testCategory",
      type: "hashtagSearchCondition/setCategory",
    });
  });
  it("dispatchAddress 함수 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({current: {value: "test"}});
    const {result} = renderHook(() => useTagSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchAddress();
    });
    expect(mockStore.getActions()[3]).toEqual({
      payload: {
        adress: "testAdress",
      },
      type: "hashtagSearchCondition/setAdress",
    });
  });
  it("dispatchSearchStore 함수 테스트", () => {
    const {result} = renderHook(() => useTagSearch(), {
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
      payload: {
        hashtag: "result",
        type: "hashtag",
      },
      type: "searchType/setSearchType",
    });
  });
});

describe("TagSearch Presentational 테스트", () => {
  it("정상 렌더링", () => {
    const dispatchCategoryMock = jest.fn();
    const dispatchHashtagMock = jest.fn();
    const dispatchAddressMock = jest.fn();
    const dispatchSearchStoreMock = jest.fn();
    const utils = render(
      <TagSearch
        hashtag={{
          카페: {
            목적: [["test", 1, 1]],
          },
        }}
        selectedHashtag={[]}
        selectedCategory={"카페"}
        dispatchCategory={dispatchCategoryMock}
        dispatchHashtag={dispatchHashtagMock}
        dispatchAddress={dispatchAddressMock}
        inputRef={{current: null}}
        dispatchSearchStore={dispatchSearchStoreMock}
      ></TagSearch>
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("dispatchCategory0"));
    fireEvent.click(screen.getByTestId("dispatchHashtag0"));
    fireEvent.click(screen.getByTestId("dispatchAddress"));
    fireEvent.click(screen.getByTestId("dispatchSearchStore"));
    expect(dispatchCategoryMock).toBeCalledTimes(1);
    expect(dispatchHashtagMock).toBeCalledTimes(1);
    expect(dispatchAddressMock).toBeCalledTimes(1);
    expect(dispatchSearchStoreMock).toBeCalledTimes(1);
  });
});
