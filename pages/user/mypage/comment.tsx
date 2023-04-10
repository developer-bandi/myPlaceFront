import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import MyCommentContainer from "../../../component/User/Mypage/MyComment/MyCommentContainer";
import { useLogin } from "../../../hooks/loginCheck";

const Comment = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 내 댓글</title>
        <meta name="title" property="og:title" content="My place - 내 댓글" />
        <meta
          name="description"
          property="og:description"
          content="내 댓글을 볼수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <MyCommentContainer />
      <Footer />
    </>
  );
};
export default Comment;
