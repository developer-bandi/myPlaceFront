import AddStoreInfoContainer from "../../component/Contribute/Store/AddStoreInfo/AddStoreInfoContainer";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import { useLogin } from "../../hooks/loginCheck";
import Head from "next/head";
import { useRouter } from "next/router";

const Contribute = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 장소추가</title>
        <meta name="title" property="og:title" content="My place - 장소추가" />
        <meta
          name="description"
          property="og:description"
          content="장소의 정보를 추가할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <AddStoreInfoContainer />
      <Footer />
    </>
  );
};

export default Contribute;
