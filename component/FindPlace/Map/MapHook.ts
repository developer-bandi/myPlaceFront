import React, {useEffect, useState, useRef, SetStateAction} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {
  setAdress,
  setMarkerClickStatus,
} from "../../../store/reducers/hashtagSearchCondition/Reducer";
import {setActive} from "../../../store/reducers/mapClick/Reducer";
import {getStoreInfo} from "../../../store/reducers/storeInfo/Reducer";

declare global {
  interface Window {
    kakao: any;
  }
}

const useMap = () => {
  const settedAdress = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.adress.content
  );
  const clicked = useSelector(
    (state: RootReducer) => state.hashtagSearchCondition.adress.mapClick
  );
  const searchResult = useSelector(
    (state: RootReducer) => state.searchResult.content
  );
  const mapClick = useSelector((state: RootReducer) => state.mapClick.active);
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // 지도 앱이 next.js ssr 규칙을 따르지 않아 useEffect 사용
  const [loading, setLoading] = useState(false);
  const [makedmap, setMakedMap] = useState<any>();
  const [newmarker, setnewmarker] = useState<any>();
  const [searchMarker, setSearchMarker] = useState<any>([]);
  const clickHandeler = useRef<
    (mouseEvent: {
      latLng: {
        Ma: string;
        La: string;
        getLng: () => void;
        getLat: () => void;
      };
    }) => void
  >();

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.type = "text/javascript";
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services,clusterer`;

    // 헤더에 스크립트 파일을 삽입
    document.head.appendChild(mapScript);
    const onLoadMap = () => {
      window.kakao.maps.load(() => {
        // 지도를 표시할 div
        const options = {
          //  지도의 중심좌표 및 기본확대수준
          center: new window.kakao.maps.LatLng(
            35.23139384418825,
            129.086333411491
          ),
          level: 3,
        };
        // div와 옵션으로 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, options);
        // 줌 컨트롤
        const zoomControl = new window.kakao.maps.ZoomControl();
        var marker = new window.kakao.maps.Marker();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);
        setLoading(true);
        setMakedMap(map);
        setnewmarker(marker);
      });
    };
    mapScript.addEventListener("load", onLoadMap);
    return () => mapScript.removeEventListener("load", onLoadMap);
  }, []);
  //처음 지도와 확대축소버튼을 로드하는 로직

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
          coords: {getLng: () => void; getLat: () => void},
          callback: (
            result: {
              road_address: {address_name: string};
              address: {address_name: string};
            }[],
            status: string
          ) => void
        ) => {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        };
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (
            result: {
              road_address: {address_name: string};
              address: {address_name: string};
            }[],
            status: string
          ) {
            if (status === window.kakao.maps.services.Status.OK) {
              // 마커를 클릭한 위치에 표시합니다
              newmarker.setPosition(mouseEvent.latLng);
              newmarker.setMap(makedmap);

              dispatch(setMarkerClickStatus(true));
              if (result[0].road_address) {
                dispatch(
                  setAdress({
                    adress: result[0].road_address.address_name,
                    latitude: mouseEvent.latLng.Ma,
                    longitude: mouseEvent.latLng.La,
                  })
                );
              } else {
                dispatch(
                  setAdress({
                    adress: result[0].address.address_name,
                    latitude: mouseEvent.latLng.Ma,
                    longitude: mouseEvent.latLng.La,
                  })
                );
              }
            }
          }
        );
      };
    }
  }, [loading]);
  //처음 지도 로드시 클릭이벤트를 ref에 추가하는 로직

  useEffect(() => {
    if (loading) {
      if (mapClick) {
        window.kakao.maps.event.addListener(
          makedmap,
          "click",
          clickHandeler.current
        );
      } else {
        window.kakao.maps.event.removeListener(
          makedmap,
          "click",
          clickHandeler.current
        );
      }
    }
  }, [loading, mapClick]);
  //지도 클릭을 활성화 하는지 여부에 따라서 이벤트를 등록 혹은 삭제하는 로직

  useEffect(() => {
    if (settedAdress == "" && newmarker !== undefined) {
      newmarker.setMap(null);
    } else {
      if (!clicked) {
        if (settedAdress !== "" && loading) {
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
                newmarker.setPosition(coords);
                newmarker.setMap(makedmap);
                makedmap.setCenter(coords);
                dispatch(
                  setAdress({
                    latitude: result[0].y,
                    longitude: result[0].x,
                  })
                );
              } else if (
                status === window.kakao.maps.services.Status.ZERO_RESULT
              ) {
                alert("주소를 정확하게 입력해주세요");
                dispatch(setAdress({adress: ""}));
              } else {
                alert("서버에 에러가 발생하였습니다");
              }
            }
          );
        }
      } else {
        dispatch(setMarkerClickStatus(false));
      }
    }
  }, [settedAdress, loading]);
  //사이드바에 주소가 입력될 경우 지도에 마커를 표시하는 함수

  useEffect(() => {
    if (searchResult === undefined && searchMarker.length !== 0) {
      searchMarker.map((data: any) => {
        data.setMap(null);
      });
    }
    //검색결과가 초기화 될때 지도에 표기된 마커를 삭제

    if (searchResult !== undefined && searchResult.length !== 0 && loading) {
      const markers: unknown[] = [];

      const displayMarker = (place: {
        latitude: string;
        longitude: string;
        name: string;
        id: number;
      }) => {
        const dispatchStoreInfo = (storeId: number) => {
          dispatch(getStoreInfo(storeId));
        };
        const content = document.createElement("div");
        const info = document.createElement("div");
        content.className = "overlaybox";
        info.className = "boxtitle";
        info.innerText = place.name;
        content.onclick = () => {
          dispatchStoreInfo(place.id);
        };
        content.appendChild(info);

        const position = new window.kakao.maps.LatLng(
          place.latitude,
          place.longitude
        );

        const marker = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        marker.setMap(makedmap);
        markers.push(marker);
      };

      for (let i = 0; i < searchResult.length; i++) {
        displayMarker(searchResult[i]);
      }
      setSearchMarker(markers);
      dispatch(setActive());
    }
  }, [searchResult, loading]);
  //검색 결과를 지도에 표시하는 로직

  return {
    mapRef,
    setnewmarker,
    setLoading,
    setMakedMap,
    setSearchMarker,
    mapClick,
    searchMarker,
    clickHandeler,
  };
};

export default useMap;
