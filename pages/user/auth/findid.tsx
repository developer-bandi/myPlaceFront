import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import FindIdContainer from "../../../component/User/auth/FindId/FindIdContainer";

const FindIdPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 아이디 찾기</title>
        <meta
          name="title"
          property="og:title"
          content="My place -  아이디 찾기"
        />
        <meta
          name="description"
          property="og:description"
          content="아이디를 찾을수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <FindIdContainer />
      <Footer />
    </>
  );
};

export default FindIdPage;
