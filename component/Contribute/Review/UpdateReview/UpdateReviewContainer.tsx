import UpdateReview from "./UpdateReview";
import useUpdateReview from "./UpdateReviewHook";

const UpdateReviewContainer = () => {
  const {
    storeInfo,
    taglist,
    existImg,
    selectedHashtag,
    changeHashtag,
    uploadImg,
    addImg,
    textAreaRef,
    submit,
    deleteExistImg,
    deleteUploadImg,
    error,
    loading,
    uploadLoading,
  } = useUpdateReview();

  return (
    <UpdateReview
      storeInfo={storeInfo}
      taglist={taglist}
      existImg={existImg}
      selectedHashtag={selectedHashtag}
      changeHashtag={changeHashtag}
      uploadImg={uploadImg}
      addImg={addImg}
      textAreaRef={textAreaRef}
      submit={submit}
      deleteExistImg={deleteExistImg}
      deleteUploadImg={deleteUploadImg}
      error={error}
      loading={loading}
      uploadLoading={uploadLoading}
    ></UpdateReview>
  );
};

export default UpdateReviewContainer;
