import WritePost from "./WritePost";
import useWritePost from "./WritePostHook";

const WritePostContainer = () => {
  const {addImg, deleteImg, uploadImg, titleRef, contentRef, submit} =
    useWritePost();
  return (
    <WritePost
      addImg={addImg}
      deleteImg={deleteImg}
      uploadImg={uploadImg}
      titleRef={titleRef}
      contentRef={contentRef}
      submit={submit}
    />
  );
};

export default WritePostContainer;
