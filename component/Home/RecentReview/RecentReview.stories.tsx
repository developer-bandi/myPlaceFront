import { ComponentStory, ComponentMeta } from "@storybook/react";
import RecentReview from "./RecentReview";
import { action } from "@storybook/addon-actions";

export default {
  title: "Home/RecentReview",
  component: RecentReview,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof RecentReview>;

const Template: ComponentStory<typeof RecentReview> = (arg) => {
  return <RecentReview {...arg} />;
};

export const isLoading = Template.bind({});
isLoading.args = {
  serverDataStatus: { loading: true, error: false, fetching: false },
  moveTargetStore: action("moveTargetStore"),
};

export const isError = Template.bind({});
isError.args = {
  serverDataStatus: { loading: true, error: true, fetching: false },
  moveTargetStore: action("moveTargetStore"),
};

export const isNormal = Template.bind({});
isNormal.args = {
  serverData: {
    count: 15,
    rows: new Array(10).fill(0).map((data, index) => {
      return {
        id: index + 1,
        content: "testContent",
        createdAt: "testCreatedAt",
        storeName: "testStoreName",
        storeAddress: "testStoreAddress",
        storeLatitude: "testStoreLatitude",
        storeLongitude: "testStoreLongitude",
        nickname: "testNickname",
        hashtag: ["testHashtag"],
      };
    }),
  },
  moveTargetStore: action("moveTargetStore"),
};
