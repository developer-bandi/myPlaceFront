import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosUpdateStorePosition} from "../../../../lib/commonFn/api";
import {RootReducer} from "../../../../store";
import {setPosition} from "../../../../store/reducers/AddStorePosition/Reducer";
import {getStoreInfo} from "../../../../store/reducers/storeInfo/Reducer";
declare global {
  interface Window {
    kakao: any;
  }
}
const useUpdateStorePosition = () => {
  const mapref = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [makedmap, setMakedMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState<string>();

  const dispatch = useDispatch();
  const router = useRouter();
  const {id} = router.query;
  const existPosition = useSelector(
    (state: RootReducer) => state.storeInfo.content?.storeInfo
  );

  useEffect(() => {
    if (existPosition !== undefined) {
      setLatitude(existPosition.latitude);
      setLongitude(existPosition.longitude);
      setAddress(existPosition.address);
      if (addressInputRef.current !== null) {
        addressInputRef.current.value = existPosition.address;
      }
    } else {
      alert("가게 정보가 없습니다. 가게를 선택해주세요");
      router.push("/findplace");
    }
  }, []);

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
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(makedmap);

              if (addressInputRef.current !== null) {
                if (result[0].road_address) {
                  addressInputRef.current.value =
                    result[0].road_address.address_name;

                  setLatitude(mouseEvent.latLng.Ma);
                  setLongitude(mouseEvent.latLng.La);
                  setAddress(result[0].road_address.address_name);
                } else {
                  addressInputRef.current.value =
                    result[0].address.address_name;
                  setLatitude(mouseEvent.latLng.Ma);
                  setLongitude(mouseEvent.latLng.La);
                  setAddress(result[0].address.address_name);
                }
              }
            }
          }
        );
      };
      window.kakao.maps.event.addListener(makedmap, "click", clickHandeler);
      if (
        latitude !== undefined &&
        longitude !== undefined &&
        address !== undefined
      ) {
        const placePosition = new window.kakao.maps.LatLng(latitude, longitude);
        marker.setPosition(placePosition);
        marker.setMap(makedmap);
        makedmap.setCenter(placePosition);
      }
    }
  }, [loading]);

  const changeAddress = () => {
    if (addressInputRef.current !== null) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        addressInputRef.current.value,
        function (result: {x: string; y: string}[], status: string) {
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
            setLatitude("");
            setLongitude("");
            setAddress("");
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

  const changePosition = async () => {
    console.log(typeof id, typeof latitude, typeof longitude, typeof address);
    if (
      typeof id === "string" &&
      latitude !== "" &&
      longitude !== "" &&
      typeof address === "string"
    ) {
      try {
        console.log("test111");
        await axiosUpdateStorePosition(id, latitude, longitude, address);
        console.log("test");
        dispatch(getStoreInfo(Number(id)));
        alert("정상적으로 수정되었습니다");
        router.push("/findplace");
      } catch (err) {
        alert("서버에 오류가 발생했습니다");
      }
    }
  };

  return {
    mapref,
    addressInputRef,
    changeAddress,
    changePosition,
    latitude,
    longitude,
    address,
    setMarker,
    setMakedMap,
    setAddress,
    setLatitude,
    setLongitude,
  };
};

export default useUpdateStorePosition;
