import AddStoreInfo from "./AddStoreInfo";
import useAddStoreInfo from "./AddStoreInfoHook";

const AddStoreInfoContainer = () => {
  const {
    position,
    addImg,
    deleteImg,
    uploadImg,
    storeNameInputRef,
    categorySelectRef,
    telRef,
    openninghourTextareaRef,
    submit,
  } = useAddStoreInfo();

  return (
    <AddStoreInfo
      address={position.address}
      addImg={addImg}
      deleteImg={deleteImg}
      uploadImg={uploadImg}
      storeNameInputRef={storeNameInputRef}
      categorySelectRef={categorySelectRef}
      telRef={telRef}
      openninghourTextareaRef={openninghourTextareaRef}
      submit={submit}
    />
  );
};

export default AddStoreInfoContainer;
