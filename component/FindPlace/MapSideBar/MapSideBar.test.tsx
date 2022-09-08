import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {Provider} from "react-redux";
import useMapSideBar from "./MapSideBarHook";
import configureMockStore from "redux-mock-store";
import MapSideBar from "./MapSideBar";
const mockStore = configureMockStore()({
  searchResult: {loading: true},
  searchType: {},
  hashtagAll: {},
  searchCondition: {position: {}, hashtag: []},
});
const wrapper = ({children}: any) => (
  <Provider store={mockStore}>{children}</Provider>
);
describe("MapSideBar Hook 테스트", () => {
  it("changeSidebarStatus 함수 테스트", () => {
    window.confirm = jest.fn(() => true);
    const {result} = renderHook(() => useMapSideBar(), {
      wrapper,
    });
    act(() => {
      result.current.changeSidebarStatus("hashtagSearch");
    });
    expect(mockStore.getActions()[0]).toEqual({
      payload: undefined,
      type: "searchCondition/initializeHashtag",
    });
    expect(mockStore.getActions()[1]).toEqual({
      payload: undefined,
      type: "searchResult/initializeSearchResult",
    });
    expect(mockStore.getActions()[2]).toEqual({
      payload: undefined,
      type: "storeInfo/initializeStoreInfo",
    });
    expect(mockStore.getActions()[3]).toEqual({
      payload: "hashtagSearch",
      type: "searchType/setSearchType",
    });
  });
});

describe("MapSideBar Presentational 테스트", () => {
  it("hashtag,search 일때", () => {
    const changeSidebarStatusMock = jest.fn();
    const utils = render(
      <MapSideBar
        changeSidebarStatus={changeSidebarStatusMock}
        searchType={"hashtagSearch"}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
      ></MapSideBar>,
      {wrapper}
    );
    expect(utils.container).toMatchSnapshot();
    fireEvent.click(screen.getByTestId("changeSidebarStatushashtag"));
    fireEvent.click(screen.getByTestId("changeSidebarStatuskeyword"));
    expect(changeSidebarStatusMock).toBeCalledTimes(2);
  });
  it("hashtag,result 일때", () => {
    const changeSidebarStatusMock = jest.fn();
    const utils = render(
      <MapSideBar
        changeSidebarStatus={changeSidebarStatusMock}
        searchType={"hashtagSearch"}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
      ></MapSideBar>,
      {wrapper}
    );
    expect(utils.container).toMatchSnapshot();
  });
  it("name,search 일때", () => {
    const changeSidebarStatusMock = jest.fn();
    const utils = render(
      <MapSideBar
        changeSidebarStatus={changeSidebarStatusMock}
        searchType={"hashtagSearch"}
        modalStatus={{
          desktop: {search: false, storeInfo: false},
          mobile: {searchStoreInfo: true},
        }}
      ></MapSideBar>,
      {wrapper}
    );
    expect(utils.container).toMatchSnapshot();
  });
});
