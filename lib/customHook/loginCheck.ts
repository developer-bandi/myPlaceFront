import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";

export const useLogin = () => {
  const user = useSelector((state: RootReducer) => state.userLogin);
  const router = useRouter();
  useEffect(() => {
    if (!user.loading) {
      if (!user) {
        alert("로그인을 해주세요!");
        router.push("/user/auth/signin");
      }
    }
  }, [user]);
};
