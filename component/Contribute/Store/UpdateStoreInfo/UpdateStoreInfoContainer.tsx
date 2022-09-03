import AddStore from "./UpdateStoreInfo";
import useUpdateStoreInfo from "./UpdateStoreInfoHook";

const UpdateStoreInfoContainer = () => {
  const {
    existInfo,
    addImg,
    deleteExistImg,
    deleteUploadImg,
    uploadImg,
    storeNameInputRef,
    categorySelectRef,
    telRef,
    openninghourTextareaRef,
    submit,
    existImg,
  } = useUpdateStoreInfo();

  return (
    <AddStore
      existInfo={existInfo}
      addImg={addImg}
      deleteExistImg={deleteExistImg}
      deleteUploadImg={deleteUploadImg}
      uploadImg={uploadImg}
      storeNameInputRef={storeNameInputRef}
      categorySelectRef={categorySelectRef}
      telRef={telRef}
      openninghourTextareaRef={openninghourTextareaRef}
      submit={submit}
      existImg={existImg}
    />
  );
};

export default UpdateStoreInfoContainer;
