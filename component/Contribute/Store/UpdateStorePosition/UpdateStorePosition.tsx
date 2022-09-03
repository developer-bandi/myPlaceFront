import {RefObject} from "react";
import storePosition from "../../../../lib/styles/storePosition.module.scss";

interface UpdateStorePositionProps {
  mapref: RefObject<HTMLDivElement>;
  addressInputRef: RefObject<HTMLInputElement>;
  changeAddress: () => void;
  changePosition: () => void;
  isTabletOrMobile: boolean;
}

const UpdateStorePosition = ({
  mapref,
  addressInputRef,
  changeAddress,
  changePosition,
  isTabletOrMobile,
}: UpdateStorePositionProps) => {
  return (
    <div className={storePosition.mainBlock}>
      <h1 className={storePosition.title}>장소 수정</h1>
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
        <input ref={addressInputRef} className={storePosition.addressInput} />
        <button
          className={storePosition.addressButton}
          onClick={() => {
            changeAddress();
          }}
          data-testid="changeAddress"
        >
          주소 설정
        </button>
      </div>
      <div className={storePosition.submitButtonBlock}>
        <button
          className={storePosition.submitButton}
          onClick={() => {
            changePosition();
          }}
          data-testid="changePosition"
        >
          이 위치로 장소 수정
        </button>
      </div>
    </div>
  );
};

export default UpdateStorePosition;
