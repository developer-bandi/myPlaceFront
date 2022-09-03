import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";

import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import newReact from "react";
import * as React from "react";
import {useRouter} from "next/router";
import useMap from "./MapHook";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("AddStorePosition Hook 테스트", () => {
  let mockStore = "noContentnotClick";
  const mockedStore: {[index: string]: any} = {
    noContentnotClick: configureMockStore()({
      hashtagSearchCondition: {
        adress: {content: "", mapClick: false},
      },
      searchResult: {content: ""},
      mapClick: {active: true},
    }),
    ContentnotClick: configureMockStore()({
      hashtagSearchCondition: {
        adress: {content: "test", mapClick: false},
      },
      searchResult: {content: ""},
      mapClick: {active: true},
    }),
    ContentClick: configureMockStore()({
      hashtagSearchCondition: {
        adress: {content: "test", mapClick: true},
      },
      searchResult: {content: ""},
      mapClick: {active: true},
    }),
    resultZero: configureMockStore()({
      hashtagSearchCondition: {
        adress: {content: "test", mapClick: true},
      },
      searchResult: {content: []},
      mapClick: {active: true},
    }),
    resultnotZero: configureMockStore()({
      hashtagSearchCondition: {
        adress: {content: "test", mapClick: true},
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
      mapClick: {active: true},
    }),
  };
  const wrapper = ({children}: any) => (
    <Provider store={mockedStore[mockStore]}>{children}</Provider>
  );
  describe("핸들러 함수를 ref에 추가하는 useEffect", () => {
    it("정상적으로 추가되는 경우", () => {
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: any, callback: any) => {
                  callback([{x: "testx", y: "testy"}], "ok");
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
      const {result} = renderHook(() => useMap(), {
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
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: any, callback: any) => {
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      const setPositionMock = jest.fn();
      const setMapMock = jest.fn();
      const {result} = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setnewmarker({
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
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: any, callback: any) => {
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
      const {result} = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setnewmarker({
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
        result.current.setLoading(true);
      });
      expect(mockedStore.ContentnotClick.getActions()[0]).toStrictEqual({
        type: "hashtagSearchCondition/setAdress",
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
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: any, callback: any) => {
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const setMapClickMock = jest.fn();
      const {result} = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(window.alert).toBeCalledWith("주소를 정확하게 입력해주세요");
      expect(mockedStore.ContentnotClick.getActions()[1]).toStrictEqual({
        type: "hashtagSearchCondition/setAdress",
        payload: {
          adress: "",
        },
      });
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
                addressSearch: (input: any, callback: any) => {
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const setMapClickMock = jest.fn();
      const {result} = renderHook(() => useMap(), {
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
        .mockReturnValue({current: {value: "test"}});
      const setMapClickMock = jest.fn();
      const {result} = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(mockedStore.ContentClick.getActions()[0]).toEqual({
        payload: false,
        type: "hashtagSearchCondition/setMarkerClickStatus",
      });
    });
  });
  describe("검색결과를 지도에 표시하는 useEffect 테스트", () => {
    it("결과가 없는 경우", () => {
      mockStore = "resultZero";
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: any, callback: any) => {
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
          event: {
            addListener: jest.fn(),
          },
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const setMapClickMock = jest.fn();
      const setMapMock = jest.fn();
      const {result} = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setSearchMarker([
          {
            setMap: setMapMock,
          },
        ]);
      });
      act(() => {
        result.current.setLoading(true);
      });
      expect(setMapMock).toBeCalledTimes(1);
      expect(setMapMock).toBeCalledWith(null);
    });
    it("결과가 있는 경우", async () => {
      mockStore = "resultnotZero";
      const useRefSpy = jest
        .spyOn(newReact, "useRef")
        .mockReturnValue({current: {value: "test"}});
      const markerSetMapMock = jest.fn();
      const kakao = {
        maps: {
          services: {
            Geocoder: jest.fn(() => {
              return {
                addressSearch: (input: any, callback: any) => {
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
          event: {
            addListener: jest.fn(),
          },
          CustomOverlay: jest.fn(() => {
            return {setMap: markerSetMapMock};
          }),
        },
      };
      window.kakao = kakao as any;
      window.alert = jest.fn();
      const setMapClickMock = jest.fn();
      const setMapMock = jest.fn();
      const {result} = renderHook(() => useMap(), {
        wrapper,
      });
      act(() => {
        result.current.setSearchMarker([
          {
            setMap: setMapMock,
          },
        ]);
      });
      act(() => {
        result.current.setLoading(true);
      });
      await waitFor(() => {
        expect(markerSetMapMock).toBeCalledTimes(1);
        expect(result.current.searchMarker).toEqual([
          {setMap: markerSetMapMock},
        ]);
      });
    });
  });
});
