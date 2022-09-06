import AddStore from "./UpdateStoreInfo";
import useUpdateStoreInfo from "./UpdateStoreInfoHook";

const UpdateStoreInfoContainer = () => {
  const {
    existInfo,
    addMenuImg,
    deleteExistMenuImg,
    deleteMenuImg,
    uploadMenuImg,
    addMainImg,
    deleteExistMainImg,
    deleteMainImg,
    uploadMainImg,
    existMenuImg,
    existMainImg,
    storeNameInputRef,
    categorySelectRef,
    telRef,
    openninghourTextareaRef,
    submit,
  } = useUpdateStoreInfo();

  return (
    <AddStore
      existInfo={existInfo}
      addMenuImg={addMenuImg}
      deleteExistMenuImg={deleteExistMenuImg}
      deleteMenuImg={deleteMenuImg}
      uploadMenuImg={uploadMenuImg}
      addMainImg={addMainImg}
      deleteExistMainImg={deleteExistMainImg}
      deleteMainImg={deleteMainImg}
      uploadMainImg={uploadMainImg}
      existMenuImg={existMenuImg}
      existMainImg={existMainImg}
      storeNameInputRef={storeNameInputRef}
      categorySelectRef={categorySelectRef}
      telRef={telRef}
      openninghourTextareaRef={openninghourTextareaRef}
      submit={submit}
    />
  );
};

export default UpdateStoreInfoContainer;
