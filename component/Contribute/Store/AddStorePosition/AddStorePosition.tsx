import {RefObject} from "react";
import storePosition from "../../../../lib/styles/storePosition.module.scss";
interface SideMapProps {
  mapref: RefObject<HTMLDivElement>;
  addressInputRef: RefObject<HTMLInputElement>;
  setAddress: () => void;
  moveSetpage: () => void;
  isTabletOrMobile: boolean;
}

const AddStorePosition = ({
  mapref,
  addressInputRef,
  setAddress,
  moveSetpage,
  isTabletOrMobile,
}: SideMapProps) => {
  return (
    <div className={storePosition.mainBlock}>
      <h1 className={storePosition.title}>장소 등록</h1>
      <div
        ref={mapref}
        style={
          isTabletOrMobile
            ? {width: "100%", height: "400px"}
            : {width: "800px", height: "800px"}
        }
        className={storePosition.map}
      ></div>
      <div className={storePosition.addressBlock}>
        <input
          ref={addressInputRef}
          className={storePosition.addressInput}
          placeholder="지도를 클릭하거나 주소입력후 우측 버튼을 누르세요"
        />
        <button
          className={storePosition.addressButton}
          onClick={() => {
            setAddress();
          }}
          data-testid="setAddress"
        >
          주소 설정
        </button>
      </div>
      <div className={storePosition.submitButtonBlock}>
        <button
          className={storePosition.submitButton}
          onClick={() => {
            moveSetpage();
          }}
          data-testid="moveSetpage"
        >
          이 위치로 장소 설정후 다음단계로 이동
        </button>
      </div>
    </div>
  );
};

export default AddStorePosition;
