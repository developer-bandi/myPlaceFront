import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import UpdateStoreInfoContainer from "../../component/Contribute/Store/UpdateStoreInfo/UpdateStoreInfoContainer";

const UpdateStoreinfo = () => {
  const router = useRouter();
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
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <UpdateStoreInfoContainer />
      <Footer />
    </>
  );
};

export default UpdateStoreinfo;
