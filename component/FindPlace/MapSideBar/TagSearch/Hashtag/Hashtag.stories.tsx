import { ComponentStory, ComponentMeta } from "@storybook/react";
import Hashtag from "./Hashtag";

export default {
  title: "FindPlace/MapSideBar/TagSearch/Hashtag",
  component: Hashtag,
} as ComponentMeta<typeof Hashtag>;

const Template: ComponentStory<typeof Hashtag> = (arg) => {
  return (
    <div style={{ width: 400, position: "relative" }}>
      <Hashtag {...arg} />
    </div>
  );
};

export const generalType = Template.bind({});
generalType.args = {
  hashtag: {
    카페: {
      음식: [
        ["아이스아메리카노", 1, 1],
        ["카페모카", 1, 1],
      ],
    },
  },
  selectedHashtag: ["아이스아메리카노"],
  selectedCategory: "카페",
};
