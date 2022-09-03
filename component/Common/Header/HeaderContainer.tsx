import {useIsMobile} from "../../../lib/customHook/mediaQuery";
import Header from "./Header";
import useHeader from "./HeaderHook";

const HeaderContainer = () => {
  const {loginedUser, modalActvieChange, modalActive} = useHeader();
  const isMobile = useIsMobile();

  return (
    <Header
      loginedUser={loginedUser}
      modalActvieChange={modalActvieChange}
      modalActive={modalActive}
      isMobile={isMobile}
    />
  );
};

export default HeaderContainer;
