import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { loader } from "../../../../lib/loader";
import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import MyPost from "./MyPost";

export default {
  title: "User/Mypage/MyPost",
  component: MyPost,
} as ComponentMeta<typeof MyPost>;

const Template: ComponentStory<typeof MyPost> = (arg) => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();

  return (
    <MyPost {...arg} isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile} />
  );
};

const makeUrl = loader({ width: 600, height: 400 });

const nomarlContent = {
  count: 10,
  rows: new Array(10).fill(0).map((data, index) => {
    return {
      id: index + 1,
      title: "테스트 제목입니다",
      content: "안녕하세요 테스트 내용입니다",
      nickname: "place",
      viewCount: 11,
      createdAt: "2022-11-11",
      postlikecount: 1,
      comment: 0,
    };
  }),
};

export const isLoading = Template.bind({});
isLoading.args = {
  postListState: { loading: true, error: false },
};

export const isError = Template.bind({});
isError.args = {
  postListState: { loading: false, error: true },
};

export const isNoResult = Template.bind({});
isNoResult.args = {
  postListState: {
    content: { count: 0, rows: [] },
    loading: false,
    error: false,
  },
};

export const isNomarl = Template.bind({});
isNomarl.args = {
  postListState: { content: nomarlContent, loading: false, error: false },
  page: 1,
  movePostDetailPage: action("movePostDetailPage"),
  changePage: () =>
    new Promise((resolve) => {
      action("changePage")();
      resolve();
    }),
};
