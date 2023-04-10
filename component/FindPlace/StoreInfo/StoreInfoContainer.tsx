import { useIsMobile } from "../../../hooks/mediaQuery";
import StoreInfo from "./StoreInfo";
import useStoreInfo from "./StoreInfoHook";

const StoreInfoContainer = () => {
  const { store, postBookMark, deleteBookMark, deleteStoreTab, modalStatus } =
    useStoreInfo();
  const isMobile = useIsMobile();
  return (
    <StoreInfo
      store={store}
      postBookMark={postBookMark}
      deleteBookMark={deleteBookMark}
      deleteStoreTab={deleteStoreTab}
      modalStatus={modalStatus}
      isMobile={isMobile}
    />
  );
};

export default StoreInfoContainer;
