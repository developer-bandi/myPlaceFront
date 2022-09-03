import {BannerDataType} from "../../../pages";
import Banner from "./Banner";
import useBannerHook from "./BannerHook";

interface BannerConteinrProps {
  bannerData: {content?: BannerDataType[]; error: boolean};
}

const BannerContainer = ({bannerData}: BannerConteinrProps) => {
  const {carouselNumber} = useBannerHook();

  return <Banner carouselNumber={carouselNumber} bannerData={bannerData} />;
};

export default BannerContainer;
