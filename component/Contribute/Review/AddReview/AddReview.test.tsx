import {useRouter} from "next/router";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import axios from "axios";
import AddReview from "./AddReview";
import useAddReview from "./AddReviewHook";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("AddReview Presentational 테스트", () => {
  const changeHashtagMock = jest.fn();
  const addImgMock = jest.fn();
  const deleteImgMock = jest.fn();
  const submitMock = jest.fn();
  const utils = render(
    <AddReview
      storeInfo={{
        storeInfo: {
          id: 1,
          name: "testName",
          tel: "testTel",
          openingHours: "testOpeningHours",
          address: "testAddress",
          category: "testCategory",
          updatedAt: new Date(),
          latitude: "testLatitude",
          longitude: "testLongitude",
        },
      }}
      taglist={{
        content: {
          testCategory: {test: [["testHashtag1", 1, 2]]},
        },
        loading: false,
        error: false,
      }}
      selectedHashtag={[]}
      changeHashtag={changeHashtagMock}
      uploadImg={["/test"]}
      addImg={addImgMock}
      deleteImg={deleteImgMock}
      textAreaRef={{current: null}}
      submit={submitMock}
    />
  );
  expect(utils.container).toMatchSnapshot();
  fireEvent.click(screen.getByTestId("changeHashtag0"));
  fireEvent.change(screen.getByTestId("addImg"), {
    target: {value: ""},
  });
  fireEvent.click(screen.getByTestId("deleteImg0"));
  fireEvent.click(screen.getByTestId("submit"));
  expect(changeHashtagMock).toBeCalled();
  expect(addImgMock).toBeCalled();
  expect(deleteImgMock).toBeCalled();
  expect(submitMock).toBeCalled();
});

describe("AddReview Hook 테스트", () => {
  const mockStore = configureMockStore();
  let flag = true;
  const blankMockStore = mockStore({
    storeInfo: {},
    userLogin: {},
  });
  const submitMockStore = mockStore({
    storeInfo: {
      content: {
        storeInfo: {
          id: "test",
        },
      },
    },
    userLogin: {content: "test"},
  });
  const wrapper = ({children}: any) => (
    <Provider store={flag ? blankMockStore : submitMockStore}>
      {children}
    </Provider>
  );
  it("useEffect 테스트", () => {
    window.alert = jest.fn();
    const {result} = renderHook(() => useAddReview(), {wrapper});
    expect(window.alert).toBeCalledWith(
      "장소가 없습니다. 장소를 다시 선택해 접근해주세요"
    );
    expect(mockRouter.push).toBeCalledWith("/findplace");
  });

  describe("changeHashtag함수 테스트", () => {
    it("해시태그를 선택하는 경우", () => {
      window.alert = jest.fn();
      const {result} = renderHook(() => useAddReview(), {wrapper});
      act(() => {
        result.current.changeHashtag("testHashtag", 1);
      });
      expect(result.current.selectedHashtag).toEqual(["testHashtag"]);
      expect(result.current.selectedHashtagNumber).toEqual([1]);
    });
    it("해시태그 선택을 해제하는 경우", () => {
      window.alert = jest.fn();
      const {result} = renderHook(() => useAddReview(), {wrapper});
      act(() => {
        result.current.setSelectedHashtag(["testHashtag"]);
        result.current.setSelectedHashtagNumber([1]);
      });
      act(() => {
        result.current.changeHashtag("testHashtag", 1);
      });
      expect(result.current.selectedHashtag).toEqual([]);
      expect(result.current.selectedHashtagNumber).toEqual([]);
    });
  });

  describe("sumbmit함수 테스트", () => {
    it("로그인을 안한경우", async () => {
      window.alert = jest.fn();
      const {result} = renderHook(() => useAddReview(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("로그인이 필요합니다");
    });

    it("정상적으로 등록한 경우", async () => {
      flag = false;
      jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      window.alert = jest.fn();
      mockedAxios.post.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      const {result} = renderHook(() => useAddReview(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("성공적으로 등록되었습니다");
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });

    it("에러가 발생한 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: ""}});
      mockedAxios.post.mockImplementation(() =>
        Promise.reject({status: 500, data: "error"})
      );
      window.alert = jest.fn();
      const {result} = renderHook(() => useAddReview(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});
