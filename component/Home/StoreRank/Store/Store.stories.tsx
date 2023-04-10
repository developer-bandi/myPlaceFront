import { ComponentStory, ComponentMeta } from "@storybook/react";
import Store from "./Store";
import { action } from "@storybook/addon-actions";
import { loader } from "../../../../lib/loader";

export default {
  title: "Home/StoreRank/Store",
  component: Store,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Store>;

const makeUrl = loader({ width: 440, height: 300 });

const Template: ComponentStory<typeof Store> = (arg) => {
  return <Store {...arg} />;
};

export const generalType = Template.bind({});
generalType.args = {
  id: 1,
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
  moveTargetStore: action("moveTargetStore"),
};
