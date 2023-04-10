import { useIsTabletOrMobile } from "../../../../hooks/mediaQuery";
import UpdateStorePosition from "./UpdateStorePosition";
import useUpdateStorePosition from "./UpdateStorePositionHook";

const UpdateStorePositionContainer = ({}) => {
  const { mapref, addressInputRef, changeAddress, changePosition } =
    useUpdateStorePosition();
  const isTabletOrMobile = useIsTabletOrMobile();

  return (
    <UpdateStorePosition
      mapref={mapref}
      addressInputRef={addressInputRef}
      changeAddress={changeAddress}
      changePosition={changePosition}
      isTabletOrMobile={isTabletOrMobile}
    />
  );
};

export default UpdateStorePositionContainer;
