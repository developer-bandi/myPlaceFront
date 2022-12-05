import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoreBox from "./StoreBox";
import { action } from "@storybook/addon-actions";

export default {
  title: "FindPlace/MapSideBar/StoreBox",
  component: StoreBox,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof StoreBox>;

const Template: ComponentStory<typeof StoreBox> = (arg) => (
  <div style={{ width: 340, position: "relative" }}>
    <StoreBox {...arg} />
  </div>
);

export const generalType = Template.bind({});
generalType.args = {
  searchResult: [
    {
      id: 1,
      name: "상점",
      category: "카페",
      latitude: "test",
      longitude: "test",
      dist: 10,
      hashtag: {
        아름다운: 5,
        깨끗한: 4,
      },
    },
    {
      id: 1,
      name: "상점",
      category: "카페",
      latitude: "test",
      longitude: "test",
      dist: 10,
      hashtag: {
        아름다운: 5,
        깨끗한: 4,
      },
    },
    {
      id: 1,
      name: "상점",
      category: "카페",
      latitude: "test",
      longitude: "test",
      dist: 10,
      hashtag: {
        아름다운: 5,
        깨끗한: 4,
      },
    },
  ],
  showStoreInfo: action("showStoreInfo"),
};
