import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../component/Common/Footer/Footer";
import HeaderContainer from "../../../component/Common/Header/HeaderContainer";
import WithdrawalContainer from "../../../component/User/Mypage/Withdrawal/WithdrawalContainer";
import { useLogin } from "../../../lib/customHook/loginCheck";

const Withdrawal = () => {
  useLogin();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>My place - 회원 탈퇴</title>
        <meta
          name="title"
          property="og:title"
          content="My place -  회원 탈퇴"
        />
        <meta
          name="description"
          property="og:description"
          content="회원탈퇴를 진행합니다"
        />
        <meta
          name="url"
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_DOMAIN + router.pathname}
        />
      </Head>
      <HeaderContainer />
      <WithdrawalContainer />
      <Footer />
    </>
  );
};

export default Withdrawal;
