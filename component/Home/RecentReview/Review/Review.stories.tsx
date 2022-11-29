import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Review from "./Review";

export default {
  title: "Home/RecentReview/Review",
  component: Review,
} as ComponentMeta<typeof Review>;

const Template: ComponentStory<typeof Review> = (arg) => {
  return (
    <div style={{ maxWidth: 768 }}>
      <Review {...arg} />
    </div>
  );
};

export const isLoading = Template.bind({});
isLoading.args = {
  loading: true,
  index: 1,
  moveTargetStore: action("moveTargetStore"),
};

export const isNormal = Template.bind({});
isNormal.args = {
  loading: false,
  index: 1,
  content: {
    id: 1,
    content: "testContent",
    createdAt: "testCreatedAt",
    storeName: "testStoreName",
    storeAddress: "testStoreAddress",
    storeLatitude: "testStoreLatitude",
    storeLongitude: "testStoreLongitude",
    nickname: "testNickname",
    hashtag: ["testHashtag"],
  },
  moveTargetStore: action("moveTargetStore"),
};
