import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import ChoiceButton from "../../component/Contribute/ChoiceButton/ChoiceButton";
import { useLogin } from "../../hooks/loginCheck";

const addStorePositionPage = () => {
  const router = useRouter();
  useLogin();
  return (
    <>
      <Head>
        <title>My place - 장소위치 수정</title>
        <meta
          name="title"
          property="og:title"
          content="My place - 장소위치 수정"
        />
        <meta
          name="description"
          property="og:description"
          content="장소위치 수정 할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <ChoiceButton />
      <Footer />
    </>
  );
};

export default addStorePositionPage;
