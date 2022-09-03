import {useRouter} from "next/router";

const useMyComment = () => {
  const router = useRouter();
  const movePostDetailPage = (id: number) => {
    router.push(`/community/postdetail/${id}`);
  };

  return {
    movePostDetailPage,
  };
};

export default useMyComment;
