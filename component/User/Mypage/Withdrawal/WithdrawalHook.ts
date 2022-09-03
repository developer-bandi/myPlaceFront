import {useRouter} from "next/router";
import {axiosDeleteUser} from "../../../../lib/commonFn/api";

const useWithdrawal = () => {
  const router = useRouter();
  const withdrawalButton = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        const res = await axiosDeleteUser();
        if (res.status === 200) {
          alert("회원탈퇴되었습니다");
          router.push("/");
        }
      } catch (error) {
        alert("에러가 발생하였습니다");
      }
    }
  };

  const disagreeButton = () => {
    router.push("/");
  };

  return {
    withdrawalButton,
    disagreeButton,
  };
};

export default useWithdrawal;
