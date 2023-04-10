import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { loader } from "../../../../lib/loader";
import { useIsLabtopOrTabletOrMobile } from "../../../../hooks/mediaQuery";
import MyBookMark from "./MyBookMark";

export default {
  title: "User/Mypage/MyBookMark",
  component: MyBookMark,
} as ComponentMeta<typeof MyBookMark>;

const Template: ComponentStory<typeof MyBookMark> = (arg) => {
  const isLabtopOrTabletOrMobile = useIsLabtopOrTabletOrMobile();

  return (
    <MyBookMark {...arg} isLabtopOrTabletOrMobile={isLabtopOrTabletOrMobile} />
  );
};

const makeUrl = loader({ width: 600, height: 400 });

const nomarlContent = {
  count: 10,
  rows: new Array(10).fill(0).map((data, index) => {
    return {
      id: index + 1,
      name: "test",
      latitude: "test",
      longitude: "test",
      address: "test",
      category: "test",
      viewCount: 1,
      bookmark: 1,
      review: 1,
      photo: makeUrl({ src: "/place/16625346494021491388606" }),
    };
  }),
};

export const isLoading = Template.bind({});
isLoading.args = {
  bookMarkState: { loading: true, error: false },
};
export const isError = Template.bind({});
isError.args = {
  bookMarkState: { loading: false, error: true },
};
export const isNoResult = Template.bind({});
isNoResult.args = {
  bookMarkState: {
    content: { count: 0, rows: [] },
    loading: false,
    error: false,
  },
};

export const isNomarl = Template.bind({});
isNomarl.args = {
  bookMarkState: { content: nomarlContent, loading: false, error: false },
  page: 1,
  moveTargetStore: action("moveTargetStore"),
  changePage: () =>
    new Promise((resolve) => {
      action("changePage")();
      resolve();
    }),
};
