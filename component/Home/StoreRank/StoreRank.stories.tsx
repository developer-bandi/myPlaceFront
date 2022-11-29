import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoreRank from "./StoreRank";
import { action } from "@storybook/addon-actions";
import { loader } from "../../../lib/commonFn/loader";

export default {
  title: "Home/StoreRank",
  component: StoreRank,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof StoreRank>;

const makeUrl = loader({ width: 440, height: 300 });

const Template: ComponentStory<typeof StoreRank> = (arg) => {
  return <StoreRank {...arg} />;
};

export const isError = Template.bind({});
isError.args = {
  storeRankData: { error: true },
  moveTargetStore: action("moveTargetStore"),
  renewTime: "test",
};

export const isNormal = Template.bind({});
isNormal.args = {
  storeRankData: {
    content: new Array(10).fill(0).map((data, index) => {
      return {
        id: index + 1,
        name: "testName",
        address: "testAddress",
        viewCount: 1,
        bookmark: 1,
        review: 1,
        latitude: "testLatitude",
        longitude: "testLongitude",
        photo: makeUrl({
          src: "/place/16625346494021491388606",
        }),
      };
    }),
    error: false,
  },
  moveTargetStore: action("moveTargetStore"),
  renewTime: "2022-11-11",
};
