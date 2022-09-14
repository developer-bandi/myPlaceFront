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
import UpdateStoreInfo from "./UpdateStoreInfo";
import useUpdateStoreInfo from "./UpdateStoreInfoHook";

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

describe("AddStoreInfo Presentational 테스트", () => {
  const addMenuImgMock = jest.fn();
  const deleteExistMenuImgMock = jest.fn();
  const deleteMenuImgMock = jest.fn();
  const addMainImgMock = jest.fn();
  const deleteExistMainImgMock = jest.fn();
  const deleteMainImgMock = jest.fn();
  const submitMock = jest.fn();
  const utils = render(
    <UpdateStoreInfo
      existInfo={{}}
      addMenuImg={addMenuImgMock}
      deleteExistMenuImg={deleteExistMenuImgMock}
      deleteMenuImg={deleteMenuImgMock}
      uploadMenuImg={["/menu"]}
      addMainImg={addMainImgMock}
      deleteExistMainImg={deleteExistMainImgMock}
      deleteMainImg={deleteMainImgMock}
      uploadMainImg={["/main"]}
      existMenuImg={["/existmenu"]}
      existMainImg={"/existmain"}
      storeNameInputRef={{current: null}}
      categorySelectRef={{current: null}}
      telRef={{current: null}}
      openninghourTextareaRef={{current: null}}
      submit={submitMock}
      loading={false}
    />
  );

  fireEvent.change(screen.getByTestId("addMainImg"), {
    target: {value: ""},
  });
  fireEvent.click(screen.getByTestId("deleteExistMainImg"));
  fireEvent.click(screen.getByTestId("deleteMainImg0"));
  fireEvent.change(screen.getByTestId("addMenuImg"), {
    target: {value: ""},
  });
  fireEvent.click(screen.getByTestId("deleteExistMenuImg0"));
  fireEvent.click(screen.getByTestId("deleteMenuImg0"));
  fireEvent.click(screen.getByTestId("submit"));

  expect(utils.container).toMatchSnapshot();
  expect(addMenuImgMock).toBeCalledTimes(1);
  expect(deleteExistMenuImgMock).toBeCalledTimes(1);
  expect(deleteMenuImgMock).toBeCalledTimes(1);
  expect(addMainImgMock).toBeCalledTimes(1);
  expect(deleteExistMainImgMock).toBeCalledTimes(1);
  expect(deleteMainImgMock).toBeCalledTimes(1);
  expect(submitMock).toBeCalledTimes(1);
});

describe("UpdateStoreInfo Hook 테스트", () => {
  let blank = false;
  const storeInfoMockStore = configureMockStore()({
    storeInfo: {
      content: {
        storeInfo: {
          name: "testName",
          category: "testCategory",
          tel: "testTel",
          openingHours: "testOpeningHours",
        },
      },
    },
  });
  const storeInfoBlankMockStore = configureMockStore()({
    storeInfo: {
      content: {},
    },
  });
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <Provider store={blank ? storeInfoBlankMockStore : storeInfoMockStore}>
      {children}
    </Provider>
  );
  describe("데이터를 받아오는 useEffect 테스트", () => {
    it("정상적으로 반영하는 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValueOnce({current: {value: "test1"}})
        .mockReturnValueOnce({current: {value: "test2"}})
        .mockReturnValueOnce({current: {value: "test3"}})
        .mockReturnValueOnce({current: {value: "test4"}})
        .mockReturnValueOnce({current: {value: "test5"}})
        .mockReturnValueOnce({current: {value: "test6"}})
        .mockReturnValueOnce({current: {value: "test7"}})
        .mockReturnValueOnce({current: {value: "test8"}});

      const {result} = renderHook(() => useUpdateStoreInfo(), {wrapper});
      expect(result.current.storeNameInputRef.current).toEqual({
        value: "testName",
      });
      expect(result.current.categorySelectRef.current).toEqual({
        value: "testCategory",
      });
      expect(result.current.telRef.current).toEqual({value: "testTel"});
      expect(result.current.openninghourTextareaRef.current).toEqual({
        value: "testOpeningHours",
      });
    });
    it("정상적으로 반영하지 못하는 경우", () => {
      blank = true;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      window.alert = jest.fn();
      const {result} = renderHook(() => useUpdateStoreInfo(), {wrapper});
      expect(window.alert).toBeCalledWith(
        "수정할 가게 정보가 없습니다. 가게를 선택해주세요"
      );
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });
  });

  describe("sumbmit함수 테스트", () => {
    it("가게이름을 입력하지 않은 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {}});
      window.alert = jest.fn();
      const {result} = renderHook(() => useUpdateStoreInfo(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("가게 이름을 입력해주세요");
    });
    it("카테고리를 선택하지 않은 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "category"}});
      window.alert = jest.fn();
      const {result} = renderHook(() => useUpdateStoreInfo(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("카테고리를 선택해 주세요");
    });
    it("정상적으로 전송한 경우", async () => {
      blank = false;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: ""}});
      mockedAxios.patch.mockImplementation(() =>
        Promise.resolve({status: 200, data: "test"})
      );
      window.alert = jest.fn();
      const {result} = renderHook(() => useUpdateStoreInfo(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("정상적으로 수정되었습니다");
      expect(storeInfoMockStore.getActions()[0]).toEqual({
        payload: undefined,
        type: "storeInfo/getStoreInfo",
      });
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });
    it("에러가 발생한 경우", async () => {
      blank = false;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: ""}});
      mockedAxios.patch.mockImplementation(() =>
        Promise.reject({status: 500, data: "error"})
      );
      window.alert = jest.fn();
      const {result} = renderHook(() => useUpdateStoreInfo(), {wrapper});
      await act(async () => {
        await result.current.submit();
      });
      expect(window.alert).toBeCalledWith("에러가 발생하였습니다");
    });
  });
});
