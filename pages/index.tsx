import type { GetStaticProps } from "next";
import Footer from "../component/Common/Footer/Footer";
import HeaderContainer from "../component/Common/Header/HeaderContainer";
import Head from "next/head";
import { useRouter } from "next/router";
import BannerContainer from "../component/Home/Banner/BannerContainer";
import StoreRankContainer from "../component/Home/StoreRank/StoreRankContainer";
import RecentReviewContainer from "../component/Home/RecentReview/RecentReviewContainer";
import { setDateYearMonthDayHour } from "../lib/date";
import { getBanner, getStorePopular } from "../api/home";

export interface BannerDataType {
  backgroundColor: string;
  title: string;
  summary: string;
  router: string;
  img: string;
}

export interface storeRankDataType {
  id: number;
  name: string;
  address: string;
  viewCount: number;
  bookmark: number;
  review: number;
  photo?: string;
  latitude: string;
  longitude: string;
}

interface HomeProps {
  bannerData: { content?: BannerDataType[]; error: boolean };
  storeRankData: { content?: storeRankDataType[]; error: boolean };
  renewTime: string;
}
const Home = ({ bannerData, storeRankData, renewTime }: HomeProps) => {
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
      <main>
        <BannerContainer bannerData={bannerData} />
        <StoreRankContainer
          storeRankData={storeRankData}
          renewTime={renewTime}
        />
        <RecentReviewContainer />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const [{ data: bannerContent }, { data: storeRankContent }] =
      await Promise.all([getBanner(), getStorePopular()]);
    return {
      props: {
        bannerData: { content: bannerContent, error: false },
        storeRankData: { content: storeRankContent, error: false },
        renewTime: setDateYearMonthDayHour(new Date()),
      },
      revalidate: 86400,
    };
  } catch (err) {
    return {
      props: {
        bannerData: { error: true },
        storeRankData: { error: true },
      },
      revalidate: 3600,
    };
  }
};

export default Home;
