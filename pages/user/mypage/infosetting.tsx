import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import MyInfoSettingContainer from "../../../component/User/Mypage/MyInfoSetting/MyInfoSettingContainer";
import { useLogin } from "../../../hooks/loginCheck";

const InfoSetting = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 내 정보</title>
        <meta name="title" property="og:title" content="My place -  내 정보" />
        <meta
          name="description"
          property="og:description"
          content=" 내 정보를 볼수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <MyInfoSettingContainer />
      <Footer />
    </>
  );
};

export default InfoSetting;
