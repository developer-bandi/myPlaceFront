import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../component/Common/Footer/Footer";
import HeaderContainer from "../../component/Common/Header/HeaderContainer";
import PostListContainer from "../../component/Community/PostList/PostListContainer";
import { postListContent } from "../../component/Community/PostList/PostListHook";
import { axiosGetPostList } from "../../lib/commonFn/api";

interface PostListPageProps {
  serverSideData: postListContent;
}

const PostListPage = ({ serverSideData }: PostListPageProps) => {
  const router = useRouter();
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
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <PostListContainer serverSideData={serverSideData} />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axiosGetPostList(1, "createdAt");

  return { props: { serverSideData: res.data } };
};

export default PostListPage;
