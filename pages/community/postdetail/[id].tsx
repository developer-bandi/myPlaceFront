import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import PostDetailContainer from "../../../component/Community/PostDetail/PostDetailContainer";
import { postDetailType } from "../../../lib/apitype/post";
import { axiosGetPostDetail } from "../../../lib/commonFn/api";

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
      <PostDetailContainer serverSideData={serverSideData} />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params !== undefined && context.params.id;
  const res = await axiosGetPostDetail(id as string);

  // Pass data to the page via props
  return { props: { serverSideData: res.data } };
};

export default PostDetailPage;
