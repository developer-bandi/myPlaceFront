import { useRouter } from "next/router";
import { axiosDeleteUser } from "../../../../lib/commonFn/api";
import Withdrawal from "./Withdrawal";

const WithdrawalContainer = () => {
  const router = useRouter();
  const withdrawalButton = () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      axiosDeleteUser()
        .then((res) => {
          if (res.status === 200) {
            alert("회원탈퇴되었습니다");
            router.push("/");
          }
        })
        .catch((error) => {
          alert("에러가 발생하였습니다");
        });
    }
  };

  const disagreeButton = () => {
    router.push("/");
  };
  return (
    <Withdrawal
      withdrawalButton={withdrawalButton}
      disagreeButton={disagreeButton}
    />
  );
};

export default WithdrawalContainer;
