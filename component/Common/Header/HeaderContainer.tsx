import { getNoticeList } from "../../../api/auth";
import useGetServerData from "../../../hooks/getData";
import { useIsMobile } from "../../../hooks/mediaQuery";
import { noticeListState } from "../Notice/NoticeContainer";
import Header from "./Header";
import useHeader from "./HeaderHook";

const HeaderContainer = () => {
  const {
    loginedUser,
    changePageModal,
    changeNoticeModal,
    modalStatus,
    moveContributePage,
  } = useHeader();
  const { serverData } = useGetServerData(getNoticeList);
  const isMobile = useIsMobile();

  return (
    <Header
      loginedUser={loginedUser}
      changePageModal={changePageModal}
      changeNoticeModal={changeNoticeModal}
      serverData={serverData as noticeListState}
      isMobile={isMobile}
      modalStatus={modalStatus}
      moveContributePage={moveContributePage}
    />
  );
};

export default HeaderContainer;
