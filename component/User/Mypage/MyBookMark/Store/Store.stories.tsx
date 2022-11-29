import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { loader } from "../../../../../lib/commonFn/loader";
import Store from "./Store";

export default {
  title: "User/Mypage/MyBookMark/Store",
  component: Store,
} as ComponentMeta<typeof Store>;

const Template: ComponentStory<typeof Store> = (arg) => <Store {...arg} />;
const makeUrl = loader({ width: 600, height: 400 });

const content = {
  id: 1,
  name: "test",
  latitude: "test",
  longitude: "test",
  address: "test",
  category: "test",
  viewCount: 1,
  bookmark: 1,
  review: 1,
  photo: makeUrl({ src: "/place/16625346494021491388606" }),
};

export const generalType = Template.bind({});
generalType.args = {
  content,
  index: 1,
  moveTargetStore: action("moveTargetStore"),
};
