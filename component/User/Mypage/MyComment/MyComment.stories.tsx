import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import MyComment from "./MyComment";

export default {
  title: "User/Mypage/MyComment",
  component: MyComment,
} as ComponentMeta<typeof MyComment>;

const Template: ComponentStory<typeof MyComment> = (arg) => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();

  return (
    <MyComment {...arg} isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile} />
  );
};

const nomarlContent = {
  count: 1,
  rows: [
    {
      id: 1,
      content: "테스트용 댓글 입니다",
      createdAt: new Date("2022-11-11").toDateString(),
      PostId: 1,
      nickname: "place",
    },
    {
      id: 2,
      content: "테스트용 댓글 입니다",
      createdAt: new Date("2022-11-11").toDateString(),
      PostId: 1,
      nickname: "place",
    },
    {
      id: 3,
      content: "테스트용 댓글 입니다",
      createdAt: new Date("2022-11-11").toDateString(),
      PostId: 1,
      nickname: "place",
    },
  ],
};

export const isLoading = Template.bind({});
isLoading.args = {
  commentListState: { loading: true, error: false },
};
export const isError = Template.bind({});
isError.args = {
  commentListState: { loading: false, error: true },
};
export const isNoResult = Template.bind({});
isNoResult.args = {
  commentListState: {
    content: { count: 0, rows: [] },
    loading: false,
    error: false,
  },
};

export const isNomarl = Template.bind({});
isNomarl.args = {
  commentListState: { content: nomarlContent, loading: false, error: false },
  page: 1,
  movePostDetailPage: action("moveTargetStore"),
  changePage: () =>
    new Promise((resolve) => {
      action("changePage")();
      resolve();
    }),
};
