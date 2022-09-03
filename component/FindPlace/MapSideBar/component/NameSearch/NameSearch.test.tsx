import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import useNameSearch from "./NameSearchHook";
import newReact from "react";
import * as React from "react";
import NameSearch from "./NameSearch";

const mockStore = configureMockStore()({
  hashtagSearchCondition: {
    adress: {content: "testAdress"},
    keyword: "testKeyword",
  },
});
const wrapper = ({children}: any) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe("NameSearch Hook 테스트", () => {
  it("처음 useEffect 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({current: {value: "test"}})
      .mockReturnValueOnce({current: {value: "test"}});
    const {result} = renderHook(() => useNameSearch(), {
      wrapper,
    });
    expect(result.current.addressInputRef).toEqual({
      current: {value: "testAdress"},
    });
    expect(result.current.searchKeywordInputRef).toEqual({
      current: {value: "testKeyword"},
    });
  });
  it("dispatchAddress함수 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({current: {value: "test"}})
      .mockReturnValueOnce({current: {value: "test"}});
    const {result} = renderHook(() => useNameSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchAddress();
    });
    expect(mockStore.getActions()[0]).toEqual({
      payload: {
        adress: "testAdress",
      },
      type: "hashtagSearchCondition/setAdress",
    });
  });
  it("dispatchSearchStore함수 테스트", () => {
    jest
      .spyOn(newReact, "useRef")
      .mockReturnValueOnce({current: {value: "test"}})
      .mockReturnValueOnce({current: {value: "test"}});
    const {result} = renderHook(() => useNameSearch(), {
      wrapper,
    });
    act(() => {
      result.current.dispatchAddress();
    });
    expect(mockStore.getActions()[1]).toEqual({
      payload: {
        adress: "testAdress",
      },
      type: "hashtagSearchCondition/setAdress",
    });
  });
});

describe("NameSearch Presentational 테스트", () => {
  it("정상 렌더링", () => {
    const dispatchAddressMock = jest.fn();
    const dispatchSearchStoreMock = jest.fn();
    const utils = render(
      <NameSearch
        dispatchAddress={dispatchAddressMock}
        searchKeywordInputRef={{current: null}}
        addressInputRef={{current: null}}
        dispatchSearchStore={dispatchSearchStoreMock}
      ></NameSearch>
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("dispatchAddress"));
    fireEvent.click(screen.getByTestId("dispatchSearchStore"));
    expect(dispatchAddressMock).toBeCalledTimes(1);
    expect(dispatchSearchStoreMock).toBeCalledTimes(1);
  });
});
