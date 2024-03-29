import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import UpdateReviewContainer from "../../../component/Contribute/Review/UpdateReview/UpdateReviewContainer";
import { useLogin } from "../../../hooks/loginCheck";

const UpdateReview = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 리뷰수정</title>
        <meta name="title" property="og:title" content="My place - 리뷰수정" />
        <meta
          name="description"
          property="og:description"
          content="리뷰를 수정할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <UpdateReviewContainer />
      <Footer />
    </>
  );
};

export default UpdateReview;
