import styles from "./ChoiceButton.module.scss";
import first from "../../../public/placeRegistration.svg";
import second from "../../../public/reviewRegistration.svg";
import Button from "./Button/Button";

const ChoiceButton = () => {
  return (
    <div className={styles.mainBlock}>
      <Button
        position={"left"}
        image={first}
        title={"장소 등록"}
        content={"먼저 위치를 등록한후, 장소에 대한 정보를 추가해보세요"}
        linkPath={"/contribute/addstoreposition"}
        linkContent={"장소 등록하러 이동하기"}
      />
      <Button
        position={"right"}
        image={second}
        title={"후기 등록"}
        content={"먼저 장소를 검색한후, 후기를 추가해 보세요"}
        linkPath={"/findplace"}
        linkContent={"후기 등록하러 이동하기"}
      />
    </div>
  );
};

export default ChoiceButton;
