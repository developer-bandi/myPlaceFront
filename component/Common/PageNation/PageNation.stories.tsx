import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PageNation from "./PageNation";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { action } from "@storybook/addon-actions";

export default {
  title: "Common/PageNation",
  component: PageNation,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "desktop",
    },
  },
} as ComponentMeta<typeof PageNation>;

const Template: ComponentStory<typeof PageNation> = (arg) => {
  const [page, setPage] = useState(arg.page);
  return (
    <PageNation
      {...arg}
      page={page}
      changePage={(page) =>
        new Promise((resolve) => {
          action("changePage")();
          setPage(page);
          console.log(page);
          resolve();
        })
      }
    />
  );
};

export const beforePageSetBan = Template.bind({});
beforePageSetBan.args = {
  page: 5,
  totalCount: 100,
  unit: 10,
};

export const afterPageSetBan = Template.bind({});
afterPageSetBan.args = {
  page: 6,
  totalCount: 100,
  unit: 10,
};

export const generalPageSet = Template.bind({});
generalPageSet.args = {
  page: 6,
  totalCount: 150,
  unit: 10,
};
