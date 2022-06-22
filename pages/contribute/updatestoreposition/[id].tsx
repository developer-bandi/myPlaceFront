import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import UpdateStorePositionContainer from "../../../component/Contribute/Store/UpdateStorePosition/UpdateStorePositionContainer";
import { useLogin } from "../../../lib/customHook/loginCheck";

const UpdateStore = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 위치 수정</title>
        <meta name="title" property="og:title" content="My place - 위치수정" />
        <meta
          name="description"
          property="og:description"
          content="장소의 위치를 수정할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <UpdateStorePositionContainer />
      <Footer />
    </>
  );
};

export default UpdateStore;
