import { ComponentStory, ComponentMeta } from "@storybook/react";
import TopInfo from "./TopInfo";

export default {
  title: "FindPlace/MapSideBar/TagSearchResult/TopInfo",
  component: TopInfo,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TopInfo>;

const Template: ComponentStory<typeof TopInfo> = (arg) => (
  <div style={{ width: 340, position: "relative" }}>
    <TopInfo {...arg} />
  </div>
);

export const generalType = Template.bind({});
generalType.args = {
  searchCondition: { position: {}, category: "카페", hashtag: ["맛있는"] },
};
