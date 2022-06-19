import Head from "next/head";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import PostListContainer from "../../component/Community/PostList/PostListContainer";

const Home = () => {
  return (
    <>
      <Head>
        <title>My place - 포스트</title>
        <meta name="title" property="og:title" content="My place - 포스트" />
        <meta
          name="description"
          property="og:description"
          content="다양한 장소에 대한 의견을 교환해볼수 있습니다"
        />
        <meta name="url" property="og:url" content={window.location.href} />
      </Head>
      <HeaderContainer />
      <PostListContainer />
      <Footer />
    </>
  );
};

export default Home;
