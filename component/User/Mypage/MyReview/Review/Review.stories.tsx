import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { loader } from "../../../../../lib/loader";
import Review from "./Review";

export default {
  title: "User/Mypage/MyReview/Review",
  component: Review,
} as ComponentMeta<typeof Review>;

const Template: ComponentStory<typeof Review> = (arg) => <Review {...arg} />;

const makeUrl = loader({ width: 200, height: 200 });

const content = {
  id: "1",
  content: "테스트용 댓글 입니다",
  StoreName: "myPlace",
  Hashtags: [
    [1, "음식이 맛있는"],
    [3, "분위기 좋은"],
  ] as [number, string][],
  photo: [makeUrl({ src: "/place/16625346494021491388606" })] as [string],
  createdAt: "2022-11-11",
};

export const generalType = Template.bind({});
generalType.args = {
  content,
  moveReviewUpdatePage: action("moveReviewUpdatePage"),
  deleteReview: () =>
    new Promise((resolve) => {
      action("deleteReview")();
      resolve();
    }),
};
