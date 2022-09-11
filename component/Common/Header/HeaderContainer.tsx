import {useIsMobile} from "../../../lib/customHook/mediaQuery";
import Header from "./Header";
import useHeader from "./HeaderHook";

const HeaderContainer = () => {
  const {
    loginedUser,
    changePageModal,
    changeNoticeModal,
    isNotice,
    modalStatus,
  } = useHeader();
  const isMobile = useIsMobile();

  return (
    <Header
      loginedUser={loginedUser}
      changePageModal={changePageModal}
      changeNoticeModal={changeNoticeModal}
      isNotice={isNotice}
      isMobile={isMobile}
      modalStatus={modalStatus}
    />
  );
};

export default HeaderContainer;
