import { ComponentStory, ComponentMeta } from "@storybook/react";
import Banner from "./Banner";
import { loader } from "../../../lib/commonFn/loader";

export default {
  title: "Home/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Banner>;

const makeUrl = loader({ width: 800, height: 500 });
const bannerDataContent = [
  {
    backgroundColor: "blue",
    title: "자신의 취향에 맞는장소를\n MyPlace 에서 찾아보세요",
    summary: "해시태그, 키워드를 활용하여\n 원하는 장소를 검색해보세요",
    router: "/findplace",
    img: makeUrl({ src: "/slide/slide0_jlhmsf.svg" }),
  },
  {
    backgroundColor: "purple",
    title: "장소에 관한 이야기를\n 커뮤니티에서 나누어보세요",
    summary: "다양한 사람들과\n 장소에 관한 이야기를 나눌수 있습니다",
    router: "/community/postlist",
    img: makeUrl({ src: "/slide/slide1_ysk06a.svg" }),
  },
  {
    backgroundColor: "green",
    title: "자신이 알고있는 장소를\n 다른사람과 공유하기",
    summary: "장소에 대한 정보를 제공하는것은\n 사이트 발전에 도움이 됩니다",
    router: "/contribute/addstoreposition",
    img: makeUrl({ src: "/slide/slide2_jckgbi.svg" }),
  },
];

const Template: ComponentStory<typeof Banner> = (arg) => {
  return <Banner {...arg} />;
};

export const firstCarousel = Template.bind({});
firstCarousel.args = {
  bannerData: {
    content: bannerDataContent,
    error: false,
  },
  carouselNumber: 0,
};

export const secondCarousel = Template.bind({});
secondCarousel.args = {
  bannerData: {
    content: bannerDataContent,
    error: false,
  },
  carouselNumber: 1,
};

export const thirdCarousel = Template.bind({});
thirdCarousel.args = {
  bannerData: {
    content: bannerDataContent,
    error: false,
  },
  carouselNumber: 2,
};

export const isError = Template.bind({});
isError.args = {
  bannerData: {
    error: true,
  },
  carouselNumber: 0,
};
