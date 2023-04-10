import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import Withdrawal from "./Withdrawal";
import useWithdrawal from "./WithdrawalHook";

const WithdrawalContainer = () => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();
  const { withdrawalButton, disagreeButton } = useWithdrawal();
  return (
    <Withdrawal
      withdrawalButton={withdrawalButton}
      disagreeButton={disagreeButton}
      isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile}
    />
  );
};

export default WithdrawalContainer;
