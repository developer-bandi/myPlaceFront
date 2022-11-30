import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Post from "./Post";

export default {
  title: "User/Mypage/MyPost/Post",
  component: Post,
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (arg) => <Post {...arg} />;

const content = {
  id: 1,
  title: "테스트 제목입니다",
  content: "안녕하세요 테스트 내용입니다",
  nickname: "place",
  viewCount: 11,
  createdAt: "2022-11-11",
  postlikecount: 1,
  comment: 0,
};

export const generalType = Template.bind({});
generalType.args = {
  content,
  movePostDetailPage: action("movePostDetailPage"),
};
