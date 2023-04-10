import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import MyReviewContainer from "../../../component/User/Mypage/MyReview/MyReviewContainer";
import { useLogin } from "../../../hooks/loginCheck";

const Review = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 내 리뷰</title>
        <meta name="title" property="og:title" content="My place -  내 리뷰" />
        <meta
          name="description"
          property="og:description"
          content="내가 쓴 리뷰를 볼수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <MyReviewContainer />
      <Footer />
    </>
  );
};

export default Review;
