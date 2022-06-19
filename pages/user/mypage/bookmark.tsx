import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import MyBookMarkContainer from "../../../component/User/Mypage/MyBookMark/MyBookMarkContainer";
import { useLogin } from "../../../lib/customHook/loginCheck";

const Mypage = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 내 북마크</title>
        <meta name="title" property="og:title" content="My place - 내 북마크" />
        <meta
          name="description"
          property="og:description"
          content="내 북마크를 볼수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <MyBookMarkContainer />
      <Footer />
    </>
  );
};

export default Mypage;
