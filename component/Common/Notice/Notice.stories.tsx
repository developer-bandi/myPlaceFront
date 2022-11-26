import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Notice from "./Notice";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Common/Notice",
  component: Notice,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof Notice>;

const Template: ComponentStory<typeof Notice> = (arg) => <Notice {...arg} />;

export const isLoading = Template.bind({});
isLoading.args = {
  serverData: { loading: true, error: false },
};

export const isError = Template.bind({});
isError.args = {
  serverData: { loading: false, error: true },
};

export const isNoContent = Template.bind({});
isNoContent.args = {
  serverData: { content: [], loading: false, error: false },
};

export const isContent: ComponentStory<typeof Notice> = (arg) => {
  const [checked, setChecked] = useState([false, true, true]);
  return (
    <Notice
      serverData={{
        content: [
          {
            id: 1,
            content: "test1",
            check: checked[0],
            createdAt: "2022-10-10",
            PostId: 1,
            UserId: 2,
            updatedAt: "2022-10-10",
          },
          {
            id: 2,
            content: "test2",
            check: checked[1],
            createdAt: "2022-10-10",
            PostId: 1,
            UserId: 2,
            updatedAt: "2022-10-10",
          },
          {
            id: 3,
            content: "test3",
            check: checked[2],
            createdAt: "2022-10-10",
            PostId: 1,
            UserId: 2,
            updatedAt: "2022-10-10",
          },
        ],
        loading: false,
        error: false,
      }}
      checkNotice={(id) =>
        new Promise((resolve) => {
          const newChecked = [...checked];
          newChecked[id - 1] = true;
          action("checkNotice")();
          setChecked(newChecked);
          resolve();
        })
      }
      movePost={action("movePost")}
    />
  );
};
