import { mapCluster } from "map-cluster";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import { setPosition } from "../../../store/reducers/searchCondition/Reducer";
import {
  setClicked,
  setClickPossible,
} from "../../../store/reducers/standardMarker/Reducer";
import { getStoreInfo } from "../../../store/reducers/storeInfo/Reducer";

declare global {
  interface Window {
    kakao: any;
  }
}

const useMap = () => {
  const settedAdress = useSelector(
    (state: RootReducer) => state.searchCondition.position.address
  );
  const searchResult = useSelector(
    (state: RootReducer) => state.searchResult.content
  );
  const { clickPossible, clicked } = useSelector(
    (state: RootReducer) => state.standardMarker
  );
  const [loading, setLoading] = useState(false);
  const [mapObj, setMapObj] = useState<any>();
  const [standardMarker, setStandardMarker] = useState<any>();
  const [searchResultMarker, setSearchResultMarker] = useState<any>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapChangeHandler = useRef<() => void>();
  const clickHandeler =
    useRef<
      (mouseEvent: {
        latLng: {
          Ma: string;
          La: string;
          getLng: () => void;
          getLat: () => void;
        };
      }) => void
    >();
  const dispatch = useDispatch();

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.type = "text/javascript";
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer`;
    document.head.appendChild(mapScript);
    const onLoadMap = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(
            35.23139384418825,
            129.086333411491
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        const zoomControl = new window.kakao.maps.ZoomControl();
        const marker = new window.kakao.maps.Marker();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);
        setLoading(true);
        setMapObj(map);
        setStandardMarker(marker);
      });
    };
    mapScript.addEventListener("load", onLoadMap);
    return () => mapScript.removeEventListener("load", onLoadMap);
  }, []);
  //지도와 확대축소버튼을 로드하는 로직

  useEffect(() => {
    if (loading) {
      clickHandeler.current = (mouseEvent: {
        latLng: {
          Ma: string;
          La: string;
          getLng: () => void;
          getLat: () => void;
        };
      }) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const searchDetailAddrFromCoords = (
          coords: { getLng: () => void; getLat: () => void },
          callback: (
            result: {
              road_address: { address_name: string };
              address: { address_name: string };
            }[],
            status: string
          ) => void
        ) => {
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        };
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (
            result: {
              road_address: { address_name: string };
              address: { address_name: string };
            }[],
            status: string
          ) {
            if (status === window.kakao.maps.services.Status.OK) {
              standardMarker.setPosition(mouseEvent.latLng);
              standardMarker.setMap(mapObj);
              dispatch(setClicked(true));
              dispatch(
                setPosition({
                  address: result[0].road_address
                    ? result[0].road_address.address_name
                    : result[0].address.address_name,
                  latitude: mouseEvent.latLng.Ma,
                  longitude: mouseEvent.latLng.La,
                })
              );
            }
          }
        );
      };
    }
  }, [loading]);
  //처음 지도 로드시 클릭이벤트를 ref에 추가하는 로직

  useEffect(() => {
    if (loading) {
      if (clickPossible) {
        window.kakao.maps.event.addListener(
          mapObj,
          "click",
          clickHandeler.current
        );
      } else {
        window.kakao.maps.event.removeListener(
          mapObj,
          "click",
          clickHandeler.current
        );
      }
    }
  }, [loading, clickPossible]);
  //지도 클릭을 활성화 하는지 여부에 따라서 이벤트를 등록 혹은 삭제하는 로직

  useEffect(() => {
    if (settedAdress === undefined && standardMarker !== undefined) {
      standardMarker.setMap(null);
    } else {
      if (!clicked) {
        if (settedAdress !== undefined && loading) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(
            settedAdress,
            function (
              result: {
                x: string;
                y: string;
              }[],
              status: string
            ) {
              // 정상적으로 검색이 완료됐으면
              if (status === window.kakao.maps.services.Status.OK) {
                var coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );
                standardMarker.setPosition(coords);
                standardMarker.setMap(mapObj);
                mapObj.setCenter(coords);
                dispatch(
                  setPosition({
                    latitude: result[0].y,
                    longitude: result[0].x,
                  })
                );
              } else if (
                status === window.kakao.maps.services.Status.ZERO_RESULT
              ) {
                alert("주소를 정확하게 입력해주세요");
                dispatch(setPosition({ address: "" }));
              } else {
                alert("서버에 에러가 발생하였습니다");
              }
            }
          );
        }
      } else {
        dispatch(setClicked(false));
      }
    }
  }, [settedAdress, loading]);
  //사이드바에 주소가 입력될 경우 지도에 마커를 표시하는 함수

  useEffect(() => {
    type contentType = {
      longitude: number;
      latitude: number;
      name: string;
      level: number;
    };
    if (searchResult === undefined && searchResultMarker.length !== 0) {
      searchResultMarker.map((data: any) => {
        data.setMap(null);
      });
      if (mapChangeHandler.current !== undefined) {
        window.kakao.maps.event.removeListener(
          mapObj,
          "click",
          mapChangeHandler.current
        );
      }
    }
    //검색결과가 초기화 될때 지도에 표기된 마커를 삭제

    if (searchResult !== undefined && searchResult.length !== 0 && loading) {
      const excuteCluster = () => {
        const bounds = mapObj.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();
        const mapRange = {
          southWest: {
            latitude: swLatLng.La,
            longitude: swLatLng.Ma,
          },
          northEast: {
            latitude: neLatLng.La,
            longitude: neLatLng.Ma,
          },
        };
        console.log(mapRange);
        console.log(searchResult);
        const gridSize = { width: 7, height: 5 };
        const sortCondtionFn = (a: any, b: any) => a.id - b.id;
        return mapCluster.clustering(
          mapRange,
          gridSize,
          searchResult?.map(({ latitude, longitude, id, name }) => ({
            longitude: Number(latitude),
            latitude: Number(longitude),
            name,
            level: id,
          })) as contentType[],
          sortCondtionFn
        );
      };
      const displayMarker = (
        place: {
          avg: { latitude: number; longitude: number };
          list: contentType[];
        },
        markers: unknown[]
      ) => {
        const dispatchStoreInfo = (storeId: number) => {
          dispatch(getStoreInfo(storeId));
        };
        const content = document.createElement("div");
        const info = document.createElement("div");

        content.className = "overlaybox";
        info.className = "boxtitle";
        info.innerText = place.list[0].name;
        if (place.list.length > 1) {
          const listbox = document.createElement("ul");
          listbox.className = "overlayListBox";
          listbox.style.display = "none";
          for (let i = 0; i < place.list.length; i++) {
            const list = document.createElement("li");
            list.className = "overlayList";
            list.innerHTML = place.list[i].name;
            list.onclick = () => {
              dispatchStoreInfo(place.list[i].level);
              listbox.style.display = "none";
            };
            listbox.appendChild(list);
          }
          content.onclick = () => {
            console.log(listbox.style.display);
            if (listbox.style.display === "none") {
              listbox.style.display = "inline";
            } else {
              listbox.style.display = "none";
            }
          };
          content.appendChild(listbox);
        } else {
          content.onclick = () => {
            dispatchStoreInfo(place.list[0].level);
          };
        }

        content.appendChild(info);
        const position = new window.kakao.maps.LatLng(
          place.avg.longitude,
          place.avg.latitude
        );

        const marker = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        marker.setMap(mapObj);
        markers.push(marker);
      };

      const makeNewMarkers = () => {
        setSearchResultMarker((prev: any) => {
          prev.map((data: any) => {
            data.setMap(null);
          });
          return prev;
        });
        const markers: unknown[] = [];
        const clusteredData = excuteCluster();
        console.log(clusteredData);
        for (let i = 0; i < clusteredData.length; i++) {
          displayMarker(clusteredData[i], markers);
        }
        setSearchResultMarker(markers);
      };
      mapChangeHandler.current = makeNewMarkers;
      window.kakao.maps.event.addListener(mapObj, "idle", makeNewMarkers);
      makeNewMarkers();
      dispatch(setClickPossible(false));
    }
  }, [searchResult, loading]);
  //검색 결과를 지도에 표시하는 로직

  return {
    mapRef,
    setStandardMarker,
    setLoading,
    setMapObj,
    setSearchResultMarker,
    clickPossible,
    searchResultMarker,
    clickHandeler,
  };
};

export default useMap;
