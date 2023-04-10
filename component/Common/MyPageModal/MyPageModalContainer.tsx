import { useIsMobile } from "../../../hooks/mediaQuery";
import MyPageModal from "./MyPageModal";
import useMyPageModal from "./MyPageModalHook";

const MyPageModalContainer = () => {
  const { userLogout, modalActvieChange } = useMyPageModal();
  const isMobile = useIsMobile();

  return (
    <MyPageModal
      isMobile={isMobile}
      userLogout={userLogout}
      modalActvieChange={modalActvieChange}
    />
  );
};

export default MyPageModalContainer;
