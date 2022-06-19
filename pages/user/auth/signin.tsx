import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import Header from "../../../component/Common/Header/Header";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import SigninFormContainer from "../../../component/User/auth/signinForm/SigninFormContainer";

const login = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 로그인</title>
        <meta name="title" property="og:title" content="My place - 로그인" />
        <meta
          name="description"
          property="og:description"
          content="로그인을 할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <SigninFormContainer />
      <Footer />
    </>
  );
};

export default login;
