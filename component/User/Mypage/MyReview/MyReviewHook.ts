import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { deleteMyReview } from "../../../../api/mypage";
import { dataState } from "../../../../hooks/mypage";
import { ReviewListState } from "./MyReviewContainer";

interface useMyReviewProps {
  setServerData: React.Dispatch<SetStateAction<dataState>>;
  serverData: ReviewListState;
}

const useMyReview = ({ setServerData, serverData }: useMyReviewProps) => {
  const router = useRouter();

  const deleteReview = async (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteMyReview(id);

        if (serverData.content !== undefined)
          setServerData({
            content: {
              count: serverData.content.count - 1,
              rows: serverData.content?.rows.filter((data) => {
                if (id === data.id) {
                  return false;
                }
                return true;
              }),
            },
            loading: false,
            error: false,
          });
        alert("삭제되었습니다");
      } catch (err) {
        console.log(err);
        alert("에러가 발생하였습니다");
      }
    }
  };

  const moveReviewUpdatePage = (id: string) => {
    router.push(`/contribute/updatereview/${id}`);
  };

  return {
    deleteReview,
    moveReviewUpdatePage,
  };
};

export default useMyReview;
