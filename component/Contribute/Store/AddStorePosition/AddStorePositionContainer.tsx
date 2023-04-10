import { useIsTabletOrMobile } from "../../../../hooks/mediaQuery";
import AddStorePosition from "./AddStorePosition";
import useAddStorePosition from "./AddStorePositionHook";

const AddStorePositionContainer = () => {
  const isTabletOrMobile = useIsTabletOrMobile();
  const { mapref, addressInputRef, setAddress, moveSetpage } =
    useAddStorePosition();

  return (
    <AddStorePosition
      mapref={mapref}
      addressInputRef={addressInputRef}
      setAddress={setAddress}
      moveSetpage={moveSetpage}
      isTabletOrMobile={isTabletOrMobile}
    />
  );
};

export default AddStorePositionContainer;
