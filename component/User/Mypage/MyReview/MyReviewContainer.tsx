import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  axiosDeleteMyReview,
  axiosGetMyReviews,
} from "../../../../lib/commonFn/api";
import MyReview from "./MyReview";

const MyReviewContainer = () => {
  const [myReviews, setMyReviews] = useState<{
    content?: {
      id: string;
      content: string;
      StoreName: string;
      Hashtags: [string, string];
      photo: [string];
    }[];
    error: null | string;
    loading: boolean;
  }>({ loading: true, error: null });
  const router = useRouter();
  useEffect(() => {
    axiosGetMyReviews()
      .then((res) => {
        setMyReviews({
          content: res.data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setMyReviews({ loading: false, error });
      });
  }, []);

  const deleteReview = async (id: string) => {
    await axiosDeleteMyReview(id);
    setMyReviews({
      content: myReviews.content?.filter((data) => {
        if (id === data.id) {
          return false;
        }
        return true;
      }),
      loading: false,
      error: null,
    });
  };
  const moveReviewUpdatePage = (id: string) => {
    router.push(`/contribute/updatereview/${id}`);
  };
  return (
    <MyReview
      myReviews={myReviews}
      deleteReview={deleteReview}
      moveReviewUpdatePage={moveReviewUpdatePage}
    />
  );
};

export default MyReviewContainer;
