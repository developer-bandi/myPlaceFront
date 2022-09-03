import useMoveTargetStore from "../../../lib/customHook/moveTargetStore";
import {storeRankDataType} from "../../../pages";
import StoreRank from "./StoreRank";

interface StoreRankContainerProps {
  storeRankData: {content?: storeRankDataType[]; error: boolean};
  renewTime: string;
}

const StoreRankContainer = ({
  storeRankData,
  renewTime,
}: StoreRankContainerProps) => {
  const {moveTargetStore} = useMoveTargetStore();
  return (
    <StoreRank
      storeRankData={storeRankData}
      moveTargetStore={moveTargetStore}
      renewTime={renewTime}
    />
  );
};

export default StoreRankContainer;
