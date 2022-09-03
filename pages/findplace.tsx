import type {NextPage} from "next";
import {Context} from "next-redux-wrapper";
import Head from "next/head";
import {useRouter} from "next/router";
import {END} from "redux-saga";
import HeaderContainer from "../component/Common/Header/HeaderContainer";
import MapContainer from "../component/FindPlace/Map/MapContainer";
import MapClickButtonContainer from "../component/FindPlace/MapClickButton/MapClickContainer";
import MapSideBarContainer from "../component/FindPlace/MapSideBar/MapSideBarContainer";
import SideBarButtonContainer from "../component/FindPlace/SideBarButton/SideBarContainer";
import StoreInfoContainer from "../component/FindPlace/StoreInfo/StoreInfoContainer";
import {wrapper} from "../store";
import {getHashtagAll} from "../store/reducers/hashtagAll/Reducer";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 장소 찾기</title>
        <meta name="title" property="og:title" content="My place - 장소 찾기" />
        <meta
          name="description"
          property="og:description"
          content="다양한 해시태그 또는 이름을 이용해서 원하는 장소를 검색할수 있습니다."
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <MapSideBarContainer />
      <StoreInfoContainer />
      <SideBarButtonContainer />
      <MapClickButtonContainer />
      <MapContainer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (ctx: Context) => {
    store.dispatch(getHashtagAll());
    store.dispatch(END);

    await store.sagaTask?.toPromise();

    return {props: {}};
  }
);

export default Home;
