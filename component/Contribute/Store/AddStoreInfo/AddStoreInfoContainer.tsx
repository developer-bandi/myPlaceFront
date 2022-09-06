import AddStoreInfo from "./AddStoreInfo";
import useAddStoreInfo from "./AddStoreInfoHook";

const AddStoreInfoContainer = () => {
  const {
    position,
    addMenuImg,
    deleteMenuImg,
    uploadMenuImg,
    addMainImg,
    deleteMainImg,
    uploadMainImg,
    storeNameInputRef,
    categorySelectRef,
    telRef,
    openninghourTextareaRef,
    submit,
  } = useAddStoreInfo();

  return (
    <AddStoreInfo
      address={position.address}
      addMenuImg={addMenuImg}
      deleteMenuImg={deleteMenuImg}
      uploadMenuImg={uploadMenuImg}
      addMainImg={addMainImg}
      deleteMainImg={deleteMainImg}
      uploadMainImg={uploadMainImg}
      storeNameInputRef={storeNameInputRef}
      categorySelectRef={categorySelectRef}
      telRef={telRef}
      openninghourTextareaRef={openninghourTextareaRef}
      submit={submit}
    />
  );
};

export default AddStoreInfoContainer;
