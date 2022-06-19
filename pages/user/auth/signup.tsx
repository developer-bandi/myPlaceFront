import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import SignupFormContainer from "../../../component/User/auth/SignupForm/SignupFormContainer";
const login = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 회원가입</title>
        <meta name="title" property="og:title" content="My place - 회원가입" />
        <meta
          name="description"
          property="og:description"
          content="회원가입 할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <SignupFormContainer />
      <Footer />
    </>
  );
};

export default login;
