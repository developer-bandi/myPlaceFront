import { BannerDataType } from "../../../pages";
import Banner from "./Banner";
import useBannerHook from "./BannerHook";

interface BannerConteinrProps {
  bannerData: { content?: BannerDataType[]; error: boolean };
}

const BannerContainer = ({ bannerData }: BannerConteinrProps) => {
  const { carouselNumber, left, right, wrapRef, moveLeft, moveRight } =
    useBannerHook();

  return (
    <Banner
      carouselNumber={carouselNumber}
      bannerData={bannerData}
      left={left}
      right={right}
      wrapRef={wrapRef}
      moveLeft={moveLeft}
      moveRight={moveRight}
    />
  );
};

export default BannerContainer;
