import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import MyPostContainer from "../../../component/User/Mypage/MyPost/MyPostContainer";
import { useLogin } from "../../../lib/customHook/loginCheck";

const Post = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 내 포스트</title>
        <meta
          name="title"
          property="og:title"
          content="My place -  내 포스트"
        />
        <meta
          name="description"
          property="og:description"
          content="내가 쓴 포스트를 볼수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <MyPostContainer />
      <Footer />
    </>
  );
};

export default Post;
