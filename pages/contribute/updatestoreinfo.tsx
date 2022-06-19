import Head from "next/head";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import UpdateStoreInfoContainer from "../../component/Contribute/Store/UpdateStoreInfo/UpdateStoreInfoContainer";
import { useLogin } from "../../lib/customHook/loginCheck";

const UpdateStoreinfo = () => {
  useLogin();
  return (
    <>
      <Head>
        <title>My place - 장소정보 수정</title>
        <meta
          name="title"
          property="og:title"
          content="My place - 장소정보 수정"
        />
        <meta
          name="description"
          property="og:description"
          content="장소정보 수정 할수 있습니다"
        />
        <meta name="url" property="og:url" content={window.location.href} />
      </Head>
      <HeaderContainer />
      <UpdateStoreInfoContainer />
      <Footer />
    </>
  );
};

export default UpdateStoreinfo;
