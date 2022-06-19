import type { NextPage } from "next";
import Footer from "../component/Common/Footer/Footer";
import Banner from "../component/Home/Banner/Banner";
import HashtagRankContainer from "../component/Home/HashtagRank/HashtagRankContainer";
import HeaderContainer from "../component/Common/Header/HeaderContainer";
import Head from "next/head";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place</title>
        <meta name="title" property="og:title" content="My place" />
        <meta
          name="description"
          property="og:description"
          content="다양한 해시태그를 이용해서 원하는 장소를 검색하고 다양한 사람들과 장소에 대한 의견을 교환해 보세요"
        />
        <meta
          name="image"
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/logo.png`}
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <Banner />
      <HashtagRankContainer />
      <Footer />
    </>
  );
};

export default Home;
