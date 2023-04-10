import Head from "next/head";
import { useRouter } from "next/router";
import { END } from "redux-saga";
import { getPostDetail } from "../../../api/post";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import PostDetail from "../../../component/Community/PostDetail/PostDetail";
import { postDetailType } from "../../../lib/apitype/post";
import { wrapper } from "../../../store";
import { getPost } from "../../../store/reducers/postDetail/Reducer";

interface PostDetailPageProps {
  serverSideData: postDetailType;
}

const PostDetailPage = ({ serverSideData }: PostDetailPageProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - {serverSideData.title}</title>
        <meta
          name="title"
          property="og:title"
          content={`My place - ${serverSideData.title}`}
        />
        <meta
          name="description"
          property="og:description"
          content={serverSideData.content.substring(0, 160)}
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <PostDetail />
      <Footer />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const id = ctx.params !== undefined && ctx.params.id;
    const res = await getPostDetail(id as string);
    store.dispatch(getPost(id as string));
    store.dispatch(END);
    await store.sagaTask?.toPromise();
    return { props: { serverSideData: res.data } };
  }
);

export default PostDetailPage;
