import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Titles from "./Titles";
import { action } from "@storybook/addon-actions";

export default {
  title: "FindPlace/StoreInfo/Titles",
  component: Titles,
} as ComponentMeta<typeof Titles>;

const Template: ComponentStory<typeof Titles> = (arg) => {
  return (
    <div style={{ width: 340, position: "relative" }}>
      <Titles
        {...arg}
        storeInfo={{ id: 1, name: "상점", category: "카페" }}
        postBookMark={() =>
          new Promise((resolve) => {
            action("postBookMark");
            resolve();
          })
        }
        deleteBookMark={() =>
          new Promise((resolve) => {
            action("deleteBookMark");
            resolve();
          })
        }
        deleteStoreTab={action("deleteStoreTab")}
        isMobile={false}
      />
    </div>
  );
};

export const bookmarkActive = Template.bind({});
bookmarkActive.args = {
  bookmark: true,
};

export const bookmarkunActive = Template.bind({});
bookmarkunActive.args = {
  bookmark: false,
};
