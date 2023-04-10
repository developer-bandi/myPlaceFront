import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import AddReviewContainer from "../../component/Contribute/Review/AddReview/AddReviewContainer";
import { useLogin } from "../../hooks/loginCheck";

const Addreview = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 후기 추가</title>
        <meta name="title" property="og:title" content="My place - 후기 추가" />
        <meta
          name="description"
          property="og:description"
          content="장소의 후기를 추가할수 있습니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <AddReviewContainer />
      <Footer />
    </>
  );
};

export default Addreview;
