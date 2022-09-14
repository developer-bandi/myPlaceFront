import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import useAddStorePosition from "./AddStorePositionHook";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import {useRouter} from "next/router";
import AddStorePosition from "./AddStorePosition";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("AddStorePosition Presentational 테스트", () => {
  const setAddressMock = jest.fn();
  const moveSetpageMock = jest.fn();
  const utils = render(
    <AddStorePosition
      mapref={{current: null}}
      addressInputRef={{current: null}}
      setAddress={setAddressMock}
      moveSetpage={moveSetpageMock}
      isTabletOrMobile={false}
    />
  );
  expect(utils.container).toMatchSnapshot();
  fireEvent.click(screen.getByTestId("setAddress"));
  fireEvent.click(screen.getByTestId("moveSetpage"));
  expect(setAddressMock).toBeCalled();
  expect(moveSetpageMock).toBeCalled();
});

describe("AddStorePosition Hook 테스트", () => {
  let infoBlank = true;
  const mockStore = configureMockStore();
  const StorePositionMockStore = mockStore({
    addStorePosition: {
      address: "",
      longitude: "",
      latitude: "",
    },
  });
  const SettedStorePositionMockStore = configureMockStore()({
    addStorePosition: {
      address: "testAdress",
      longitude: "testLongitude",
      latitude: "testLatitude",
    },
  });
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <Provider
      store={infoBlank ? StorePositionMockStore : SettedStorePositionMockStore}
    >
      {children}
    </Provider>
  );
  describe("setAddress 테스트", () => {
    it("정보를 제대로 찾은 경우", () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: string, callback: Function) => {
                  callback([{x: "testx", y: "testy"}], "ok");
                },
              };
            }),
            Status: {
              OK: "ok",
              ZERO_RESULT: "zero_result",
              ERROR: "error",
            },
          },
          LatLng: jest.fn(() => "test"),
        },
      };
      window.kakao = kakao as any;
      const setPositionMock = jest.fn();
      const setMapMock = jest.fn();
      const setCenterMock = jest.fn();
      const {result} = renderHook(() => useAddStorePosition(), {wrapper});
      act(() => {
        result.current.setMarker({
          setPosition: setPositionMock,
          setMap: setMapMock,
        });
      });
      act(() => {
        result.current.setMakedMap({
          setCenter: setCenterMock,
        });
      });
      act(() => {
        result.current.setAddress();
      });
      expect(StorePositionMockStore.getActions()[0]).toStrictEqual({
        type: "addStorePosition/setPosition",
        payload: {
          address: "test",
          latitude: "testy",
          longitude: "testx",
        },
      });
    });
    it("결과가 없는 경우", () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: string, callback: Function) => {
                  callback([{x: "testx", y: "testy"}], "zero_result");
                },
              };
            }),
            Status: {
              OK: "ok",
              ZERO_RESULT: "zero_result",
              ERROR: "error",
            },
          },
          LatLng: jest.fn(() => "test"),
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const setPositionMock = jest.fn();
      const setMapMock = jest.fn();
      const setCenterMock = jest.fn();
      const {result} = renderHook(() => useAddStorePosition(), {wrapper});
      act(() => {
        result.current.setMarker({
          setPosition: setPositionMock,
          setMap: setMapMock,
        });
      });
      act(() => {
        result.current.setMakedMap({
          setCenter: setCenterMock,
        });
      });
      act(() => {
        result.current.setAddress();
      });
      expect(window.alert).toBeCalledWith("주소를 정확하게 입력해주세요");
      expect(StorePositionMockStore.getActions()[1]).toStrictEqual({
        type: "addStorePosition/setPosition",
        payload: {
          address: "",
          latitude: "",
          longitude: "",
        },
      });
      expect(result.current.addressInputRef.current).toEqual({value: ""});
      expect(setMapMock.mock.calls[0][0]).toBe(null);
    });
    it("에러 발생", () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: string, callback: Function) => {
                  callback([{x: "testx", y: "testy"}], "error");
                },
              };
            }),
            Status: {
              OK: "ok",
              ZERO_RESULT: "zero_result",
              ERROR: "error",
            },
          },
          LatLng: jest.fn(() => "test"),
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const {result} = renderHook(() => useAddStorePosition(), {wrapper});
      act(() => {
        result.current.setAddress();
      });
      expect(window.alert).toBeCalledWith("서버에 에러가 발생하였습니다");
    });
  });
  describe("moveSetpage 함수 테스트", () => {
    it("값이 채워져 있는 경우", () => {
      infoBlank = false;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const {result} = renderHook(() => useAddStorePosition(), {wrapper});
      act(() => {
        result.current.moveSetpage();
      });
      expect(mockRouter.push).toBeCalledWith("/contribute/addstoreinfo");
    });
    it("값이 비어 있는 경우", () => {
      infoBlank = true;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      window.alert = jest.fn();
      const {result} = renderHook(() => useAddStorePosition(), {
        wrapper,
      });
      act(() => {
        result.current.moveSetpage();
      });
      expect(window.alert).toBeCalledWith("위치를 설정해주세요");
    });
  });
});
