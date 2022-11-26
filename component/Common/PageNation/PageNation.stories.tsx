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
          resolve();
        })
      }
    />
  );
};

export const smallPageSet = Template.bind({});
smallPageSet.args = {
  page: 1,
  totalAmount: 30,
  contentUnit: 10,
  pageUnit: 5,
  allowPrevPageSet: () => false,
  makePages: () => [1, 2, 3],
  allowNextPageSet: () => false,
};

export const generalPageSet = Template.bind({});
generalPageSet.args = {
  page: 6,
  totalAmount: 150,
  contentUnit: 10,
  pageUnit: 5,
  allowPrevPageSet: ({ page }: { page: number }) => {
    if (page > 5) return true;
    return false;
  },
  makePrevSetPage: ({ page }: { page: number }) => {
    if (page <= 10) return 1;
    if (page <= 15) return 6;
    return 0;
  },
  makePages: ({ page }: { page: number }) => {
    if (page <= 5) return [1, 2, 3, 4, 5];
    if (page <= 10) return [6, 7, 8, 9, 10];
    if (page <= 15) return [11, 12, 13, 14, 15];
    return [];
  },
  allowNextPageSet: ({ page }: { page: number }) => {
    if (page <= 10) return true;
    return false;
  },
  makeNextSetPage: ({ page }: { page: number }) => {
    if (page <= 5) return 6;
    if (page <= 10) return 11;
    return 0;
  },
};
