import { ComponentStory, ComponentMeta } from "@storybook/react";
import TagSearchResult from "./TagSearchResult";
import { action } from "@storybook/addon-actions";

export default {
  title: "FindPlace/MapSideBar/TagSearchResult",
  component: TagSearchResult,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TagSearchResult>;

const Template: ComponentStory<typeof TagSearchResult> = (arg) => {
  return (
    <div style={{ width: 340, position: "relative" }}>
      <TagSearchResult
        {...arg}
        searchCondition={{
          position: {},
          category: "카페",
          hashtag: ["맛있는"],
        }}
      />
    </div>
  );
};

export const isLoading = Template.bind({});
isLoading.args = {
  searchResult: { loading: true, error: false },
};

export const isError = Template.bind({});
isError.args = {
  searchResult: { loading: false, error: true },
};

export const isBeforeSearch = Template.bind({});
isBeforeSearch.args = {
  searchResult: { loading: false, error: false },
};

export const isNoResult = Template.bind({});
isNoResult.args = {
  searchResult: { content: [], loading: false, error: false },
};

export const isNormal = Template.bind({});
isNormal.args = {
  searchResult: {
    content: [
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
    loading: false,
    error: false,
  },
};
