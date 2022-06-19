import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../../store";
import { setPosition } from "../../../../store/reducers/AddStoreAdress/AddStorePositionReducer";
import AddStorePosition from "./AddStorePosition";

const AddStorePositionContainer = () => {
  const mapref = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [makedmap, setMakedMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const position = useSelector((state: RootReducer) => state.addStorePosition);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.type = "text/javascript";
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=3efe55ecfaec2061baf17a762ef01372&autoload=false&libraries=services,clusterer`;
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
        const map = new window.kakao.maps.Map(mapref.current, options);
        const zoomControl = new window.kakao.maps.ZoomControl();
        const newMarker = new window.kakao.maps.Marker();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.TOPRIGHT);
        setMakedMap(map);
        setMarker(newMarker);
        setLoading(true);
      });
    };
    mapScript.addEventListener("load", onLoadMap);
    return () => mapScript.removeEventListener("load", onLoadMap);
  }, []);

  useEffect(() => {
    if (loading) {
      const clickHandeler = (mouseEvent: {
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
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(makedmap);

              if (addressInputRef.current !== null) {
                if (result[0].road_address) {
                  addressInputRef.current.value =
                    result[0].road_address.address_name;
                  dispatch(
                    setPosition({
                      latitude: mouseEvent.latLng.Ma,
                      longitude: mouseEvent.latLng.La,
                      address: result[0].road_address.address_name,
                    })
                  );
                } else {
                  addressInputRef.current.value =
                    result[0].address.address_name;
                  dispatch(
                    setPosition({
                      latitude: mouseEvent.latLng.Ma,
                      longitude: mouseEvent.latLng.La,
                      address: result[0].address.address_name,
                    })
                  );
                }
              }
            }
          }
        );
      };
      window.kakao.maps.event.addListener(makedmap, "click", clickHandeler);
    }
  }, [loading]);

  const setAddress = () => {
    if (addressInputRef.current !== null) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        addressInputRef.current.value,
        function (result: { x: string; y: string }[], status: string) {
          if (
            status === window.kakao.maps.services.Status.OK &&
            addressInputRef.current !== null
          ) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            marker.setPosition(coords);
            marker.setMap(makedmap);
            makedmap.setCenter(coords);
            dispatch(
              setPosition({
                latitude: result[0].y,
                longitude: result[0].x,
                address: addressInputRef.current.value,
              })
            );
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("주소를 정확하게 입력해주세요");
            dispatch(
              setPosition({
                latitude: "",
                longitude: "",
                address: "",
              })
            );
            if (addressInputRef.current !== null) {
              addressInputRef.current.value = "";
            }
            marker.setMap(null);
          } else {
            alert("서버에 에러가 발생하였습니다");
          }
        }
      );
    }
  };

  const moveSetpage = () => {
    if (
      position.address !== "" &&
      position.latitude !== "" &&
      position.longitude !== ""
    ) {
      router.push("/contribute/addstoreinfo");
    } else {
      alert("위치를 설정해주세요");
    }
  };

  return (
    <AddStorePosition
      mapref={mapref}
      addressInputRef={addressInputRef}
      setAddress={setAddress}
      moveSetpage={moveSetpage}
    />
  );
};

export default AddStorePositionContainer;
