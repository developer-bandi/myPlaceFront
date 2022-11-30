import LikeButton from "./LikeButton";
import useLikeButton from "./LikeButtonHook";

const LikeButtonContainer = () => {
  const { dispatchUpdateLike, checkLike, likedLength } = useLikeButton();

  return (
    <LikeButton
      dispatchUpdateLike={dispatchUpdateLike}
      liked={checkLike()}
      likedLength={likedLength}
    />
  );
};

export default LikeButtonContainer;
