import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {setPosition} from "../../../store/reducers/searchCondition/Reducer";
import {
  setClicked,
  setClickPossible,
} from "../../../store/reducers/standardMarker/Reducer";
import {getStoreInfo} from "../../../store/reducers/storeInfo/Reducer";

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
  const {clickPossible, clicked} = useSelector(
    (state: RootReducer) => state.standardMarker
  );
  const [loading, setLoading] = useState(false);
  const [mapObj, setMapObj] = useState<any>();
  const [standardMarker, setStandardMarker] = useState<any>();
  const [searchResultMarker, setSearchResultMarker] = useState<any>([]);
  const mapRef = useRef<HTMLDivElement>(null);
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
          coords: {getLng: () => void; getLat: () => void},
          callback: (
            result: {
              road_address: {address_name: string};
              address: {address_name: string};
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
              road_address: {address_name: string};
              address: {address_name: string};
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
                dispatch(setPosition({address: ""}));
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
    if (searchResult === undefined && searchResultMarker.length !== 0) {
      searchResultMarker.map((data: any) => {
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

        marker.setMap(mapObj);
        markers.push(marker);
      };

      for (let i = 0; i < searchResult.length; i++) {
        displayMarker(searchResult[i]);
      }
      setSearchResultMarker(markers);
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
