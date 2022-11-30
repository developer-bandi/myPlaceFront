import { useRouter } from "next/router";

export const useIsNotLogin = () => {
  const router = useRouter();
  const nextAction = () => {
    alert("로그인 해주세요");
    router.push("/user/auth/signin");
  };

  return { nextAction };
};
