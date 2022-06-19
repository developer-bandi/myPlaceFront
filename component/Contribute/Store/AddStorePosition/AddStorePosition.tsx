import { RefObject } from "react";
import { useIsTablet } from "../../../../lib/customHook/mediaQuery";
import storePosition from "../../../../lib/styles/storePosition.module.scss";
interface SideMapProps {
  mapref: RefObject<HTMLDivElement>;
  addressInputRef: RefObject<HTMLInputElement>;
  setAddress: () => void;
  moveSetpage: () => void;
}

const AddStorePosition = ({
  mapref,
  addressInputRef,
  setAddress,
  moveSetpage,
}: SideMapProps) => {
  const isTablet = useIsTablet();
  return (
    <div className={storePosition.mainBlock}>
      <h1 className={storePosition.title}>스토어 추가</h1>
      <div className={storePosition.subBlock}>
        <h2 className={storePosition.subTitle}>위치 지정하기</h2>
        <div
          ref={mapref}
          style={
            isTablet
              ? { width: "100%", height: "400px" }
              : { width: "940px", height: "940px" }
          }
        ></div>
        <div className={storePosition.addressBlock}>
          <input ref={addressInputRef} className={storePosition.addressInput} />
          <button
            className={storePosition.addressButton}
            onClick={() => {
              setAddress();
            }}
          >
            주소 설정
          </button>
        </div>
      </div>
      <div className={storePosition.submitButtonBlock}>
        <button
          className={storePosition.submitButton}
          onClick={() => {
            moveSetpage();
          }}
        >
          이 위치로 장소 설정
        </button>
      </div>
    </div>
  );
};

export default AddStorePosition;
