import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Comment from "./Comment";

export default {
  title: "User/Mypage/MyComment/Comment",
  component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (arg) => <Comment {...arg} />;

const content = {
  id: 1,
  content: "테스트용 댓글 입니다",
  createdAt: "18일전",
  PostId: 1,
  nickname: "place",
};

export const generalType = Template.bind({});
generalType.args = {
  content,
  movePostDetailPage: action("moveTargetStore"),
};
