import {axiosGetNotice} from "../../../lib/commonFn/api";
import useGetServerData from "../../../lib/customHook/getData";
import {useIsMobile} from "../../../lib/customHook/mediaQuery";
import {noticeListState} from "../Notice/NoticeContainer";
import Header from "./Header";
import useHeader from "./HeaderHook";

const HeaderContainer = () => {
  const {loginedUser, changePageModal, changeNoticeModal, modalStatus} =
    useHeader();
  const {serverData} = useGetServerData(axiosGetNotice);
  const isMobile = useIsMobile();

  return (
    <Header
      loginedUser={loginedUser}
      changePageModal={changePageModal}
      changeNoticeModal={changeNoticeModal}
      serverData={serverData as noticeListState}
      isMobile={isMobile}
      modalStatus={modalStatus}
    />
  );
};

export default HeaderContainer;
