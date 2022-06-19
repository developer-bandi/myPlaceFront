import { RefObject } from "react";
import storePosition from "../../../../lib/styles/storePosition.module.scss";
import submitButton from "../../../../lib/styles/submitButton.module.scss";
interface UpdateStorePositionProps {
  mapref: RefObject<HTMLDivElement>;
  addressInputRef: RefObject<HTMLInputElement>;
  changeAddress: () => void;
  changePosition: () => void;
}

const UpdateStorePosition = ({
  mapref,
  addressInputRef,
  changeAddress,
  changePosition,
}: UpdateStorePositionProps) => {
  return (
    <div className={storePosition.mainBlock}>
      <h1 className={storePosition.title}>스토어 수정</h1>
      <div className={storePosition.subBlock}>
        <h2 className={storePosition.subTitle}>위치 지정하기</h2>
        <div ref={mapref} style={{ width: "940px", height: "940px" }}></div>
        <div className={storePosition.addressBlock}>
          <input ref={addressInputRef} className={storePosition.addressInput} />
          <button
            className={storePosition.addressButton}
            onClick={() => {
              changeAddress();
            }}
          >
            주소 설정
          </button>
        </div>
      </div>
      <div className={storePosition.submitButtonBlock}>
        <button
          className={submitButton.submitButton}
          onClick={() => {
            changePosition();
          }}
        >
          이 위치로 장소 설정
        </button>
      </div>
    </div>
  );
};

export default UpdateStorePosition;
