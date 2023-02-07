import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import { useRouter } from "next/router";
import UpdateStorePosition from "./UpdateStorePosition";
import useUpdateStorePosition from "./UpdateStorePositionHook";
import axios from "axios";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
  query: { id: "1" },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UpdateStorePosition Hook 테스트", () => {
  let infoBlank = true;
  const mockStore = configureMockStore();
  const StorePositionMockStore = mockStore({
    storeInfo: {
      content: {
        storeInfo: {
          address: "testAddress",
          latitude: "testLatitude",
          longitude: "testLongitude",
        },
      },
    },
  });
  const SettedStorePositionMockStore = configureMockStore()({
    storeInfo: {
      content: {},
    },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider
      store={infoBlank ? StorePositionMockStore : SettedStorePositionMockStore}
    >
      {children}
    </Provider>
  );

  describe("데이터 처음 받아오는 useEffect 테스트", () => {
    it("데이터가 있는 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
      await waitFor(() => {
        expect(result.current.latitude).toBe("testLatitude");
        expect(result.current.longitude).toBe("testLongitude");
        expect(result.current.address).toBe("testAddress");
        expect(result.current.addressInputRef.current).toEqual({
          value: "testAddress",
        });
      });
    });
    it("데이터가 없는 경우", async () => {
      infoBlank = false;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      window.alert = jest.fn();
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
      expect(window.alert).toBeCalledWith(
        "가게 정보가 없습니다. 가게를 선택해주세요"
      );
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });
  });

  describe("changeAddress 테스트", () => {
    it("정보를 제대로 찾은 경우", () => {
      infoBlank = true;
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: string, callback: Function) => {
                  callback([{ x: "testx", y: "testy" }], "ok");
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
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
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
        result.current.changeAddress();
      });
      expect(StorePositionMockStore.getActions()[0]).toStrictEqual({
        type: "addStorePosition/setPosition",
        payload: {
          address: "testAddress",
          latitude: "testy",
          longitude: "testx",
        },
      });
    });
    it("결과가 없는 경우", () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: string, callback: Function) => {
                  callback([{ x: "testx", y: "testy" }], "zero_result");
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
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
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
        result.current.changeAddress();
      });
      expect(window.alert).toBeCalledWith("주소를 정확하게 입력해주세요");
      expect(result.current.address).toBe("");
      expect(result.current.latitude).toBe("");
      expect(result.current.longitude).toBe("");
      expect(result.current.addressInputRef.current).toEqual({ value: "" });
      expect(setMapMock.mock.calls[0][0]).toBe(null);
    });
    it("에러 발생", () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: string, callback: Function) => {
                  callback([{ x: "testx", y: "testy" }], "error");
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
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
      act(() => {
        result.current.changeAddress();
      });
      expect(window.alert).toBeCalledWith("서버에 에러가 발생하였습니다");
    });
  });

  describe("changePosition 함수 테스트", () => {
    it("값이 채워져 있는 경우", async () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      mockedAxios.patch.mockImplementation(() =>
        Promise.resolve({ status: 200, data: "test" })
      );
      window.alert = jest.fn();
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
      act(() => {
        result.current.setAddress("test");
        result.current.setLatitude("test");
        result.current.setLongitude("test");
      });
      await act(async () => {
        await result.current.changePosition();
      });
      expect(window.alert).toBeCalledWith("정상적으로 수정되었습니다");
      expect(StorePositionMockStore.getActions()[1]).toEqual({
        payload: 1,
        type: "storeInfo/getStoreInfo",
      });
      expect(mockRouter.push).toBeCalledWith("/findplace");
    });

    it("값이 비어 있는 경우", async () => {
      infoBlank = true;
      window.alert = jest.fn();
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      window.alert = jest.fn();
      mockedAxios.patch.mockImplementation(() =>
        Promise.reject({ status: 500, data: "error" })
      );
      const { result } = renderHook(() => useUpdateStorePosition(), {
        wrapper,
      });
      await act(async () => {
        await result.current.changePosition();
      });
      expect(window.alert).toBeCalledWith("서버에 오류가 발생했습니다");
    });
  });
});
