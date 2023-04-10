import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import WritePostContainer from "../../component/Community/WritePost/WritePostContainer";
import { useLogin } from "../../hooks/loginCheck";

const Writepost = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 포스트 작성</title>
        <meta
          name="title"
          property="og:title"
          content="My place - 포스트 작성"
        />
        <meta
          name="description"
          property="og:description"
          content="새 포스트를 작성할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <WritePostContainer />
      <Footer />
    </>
  );
};

export default Writepost;
