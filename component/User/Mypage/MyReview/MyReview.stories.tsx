import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { loader } from "../../../../lib/loader";
import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import MyReview from "./MyReview";

export default {
  title: "User/Mypage/MyReview",
  component: MyReview,
} as ComponentMeta<typeof MyReview>;

const Template: ComponentStory<typeof MyReview> = (arg) => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();

  return (
    <MyReview {...arg} isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile} />
  );
};

const makeUrl = loader({ width: 200, height: 200 });
makeUrl({ src: "/place/16625346494021491388606" });
const nomarlContent = {
  count: 10,
  rows: new Array(10).fill(0).map((data, index) => {
    return {
      id: String(index + 1),
      content: "테스트용 댓글 입니다",
      StoreName: "myPlace",
      Hashtags: [
        [1, "음식이 맛있는"],
        [3, "분위기 좋은"],
      ] as [number, string][],
      photo: [makeUrl({ src: "/place/16625346494021491388606" })] as [string],
      createdAt: "2022-11-11",
    };
  }),
};

export const isLoading = Template.bind({});
isLoading.args = {
  reviewListState: { loading: true, error: false },
};

export const isError = Template.bind({});
isError.args = {
  reviewListState: { loading: false, error: true },
};

export const isNoResult = Template.bind({});
isNoResult.args = {
  reviewListState: {
    content: { count: 0, rows: [] },
    loading: false,
    error: false,
  },
};

export const isNomarl = Template.bind({});
isNomarl.args = {
  reviewListState: { content: nomarlContent, loading: false, error: false },
  page: 1,
  moveReviewUpdatePage: action("moveReviewUpdatePage"),
  changePage: () =>
    new Promise((resolve) => {
      action("changePage")();
      resolve();
    }),
  deleteReview: () =>
    new Promise((resolve) => {
      action("deleteReview")();
      resolve();
    }),
};
