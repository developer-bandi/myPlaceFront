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
import useMap from "./MapHook";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("Map Hook 테스트", () => {
  let mockStore = "noContentnotClick";
  const mockedStore: { [index: string]: any } = {
    noContentnotClick: configureMockStore()({
      searchCondition: {
        position: {
          longitude: "testLongitude",
          latitude: "testLatitude",
        },
        category: "testCategory",
        hashtag: ["testHashtag"],
        keyword: "testKeyword",
      },
      searchResult: { content: "" },
      standardMarker: {
        clickPossible: true,
        clicked: true,
      },
    }),
    ContentnotClick: configureMockStore()({
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
      searchResult: { content: "" },
      standardMarker: {
        clickPossible: true,
        clicked: false,
      },
    }),
    ContentClick: configureMockStore()({
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
      searchResult: { content: "" },
      standardMarker: {
        clickPossible: true,
        clicked: true,
      },
    }),
    resultZero: configureMockStore()({
      searchCondition: {
        position: {
          longitude: "testLongitude",
          latitude: "testLatitude",
        },
        category: "testCategory",
        hashtag: ["testHashtag"],
        keyword: "testKeyword",
      },
      searchResult: {},
      standardMarker: {
        clickPossible: true,
        clicked: false,
      },
    }),
    resultnotZero: configureMockStore()({
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
      searchResult: {
        content: [
          {
            id: 1,
            name: "testName",
            category: "testCategory",
            latitude: "testLatitude",
            longitude: "testLongitude",
            dist: 1,
            hashtag: {
              test: 1,
            },
          },
        ],
      },
      standardMarker: {
        clickPossible: true,
        clicked: false,
      },
    }),
  };
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={mockedStore[mockStore]}>{children}</Provider>
  );
  describe("핸들러 함수를 ref에 추가하는 useEffect", () => {
    it("정상적으로 추가되는 경우", () => {
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
                coord2Address: jest.fn(),
              };
            }),
            Status: {
              OK: "ok",
              ZERO_RESULT: "zero_result",
              ERROR: "error",
            },
          },
          LatLng: jest.fn(() => "test"),
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      const { result } = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(typeof result.current.clickHandeler.current).toBe("function");
    });
  });
  describe("사이드바에 주소가 입력될 경우 지도에 마커를 표시하는 함수테스트", () => {
    it("초기화 하는 경우", () => {
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      const setPositionMock = jest.fn();
      const setMapMock = jest.fn();
      const { result } = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setStandardMarker({
          setPosition: setPositionMock,
          setMap: setMapMock,
        });
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(setMapMock).toBeCalledWith(null);
    });
    it("정보를 제대로 찾은 경우", () => {
      mockStore = "ContentnotClick";
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      const setPositionMock = jest.fn();
      const setMapMock = jest.fn();
      const setCenterMock = jest.fn();
      const setMapClickMock = jest.fn();
      const { result } = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setStandardMarker({
          setPosition: setPositionMock,
          setMap: setMapMock,
        });
      });
      act(() => {
        result.current.setMapObj({
          setCenter: setCenterMock,
        });
      });

      act(() => {
        result.current.setLoading(true);
      });
      expect(mockedStore.ContentnotClick.getActions()[0]).toStrictEqual({
        type: "searchCondition/setPosition",
        payload: {
          latitude: "testy",
          longitude: "testx",
        },
      });
      expect(setPositionMock).toBeCalledTimes(1);
      expect(setMapMock).toBeCalledTimes(1);
      expect(setCenterMock).toBeCalledTimes(1);
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const { result } = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(window.alert).toBeCalledWith("주소를 정확하게 입력해주세요");
      expect(mockedStore.ContentnotClick.getActions()[1]).toStrictEqual({
        type: "searchCondition/setPosition",
        payload: {
          address: "",
        },
      });
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const { result } = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(window.alert).toBeCalledWith("서버에 에러가 발생하였습니다");
    });
    it("클릭이 되어있는경우", () => {
      mockStore = "ContentClick";
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({ current: { value: "test" } });
      const { result } = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(mockedStore.ContentClick.getActions()[0]).toEqual({
        payload: false,
        type: "standardMarker/setClicked",
      });
    });
  });
});
