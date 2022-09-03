import AddReview from "./AddReview";
import useAddReview from "./AddReviewHook";

const AddReviewContainer = () => {
  const {
    storeInfo,
    taglist,
    selectedHashtag,
    changeHashtag,
    uploadImg,
    addImg,
    deleteImg,
    textAreaRef,
    submit,
  } = useAddReview();

  return (
    <AddReview
      storeInfo={storeInfo}
      taglist={taglist}
      selectedHashtag={selectedHashtag}
      changeHashtag={changeHashtag}
      uploadImg={uploadImg}
      addImg={addImg}
      deleteImg={deleteImg}
      textAreaRef={textAreaRef}
      submit={submit}
    ></AddReview>
  );
};

export default AddReviewContainer;
