import { ComponentStory, ComponentMeta } from "@storybook/react";
import TagSearch from "./TagSearch";

export default {
  title: "FindPlace/MapSideBar/TagSearch",
  component: TagSearch,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TagSearch>;

const Template: ComponentStory<typeof TagSearch> = (arg) => {
  return (
    <div style={{ width: 340, position: "relative" }}>
      <TagSearch {...arg} />
    </div>
  );
};

export const generalType = Template.bind({});
generalType.args = {
  hashtag: { 카페: { 음식: [["아이스아메리카노", 1, 1]] } },
  selectedHashtag: ["아이스아메리카노"],
  selectedCategory: "카페",
};
