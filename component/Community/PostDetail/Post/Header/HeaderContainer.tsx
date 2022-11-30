import Header from "./Header";
import useHeader from "./HeaderHook";

const HeaderContainer = () => {
  const { ...props } = useHeader();

  return <Header {...props} isMyPost={props.isMyPost()} />;
};

export default HeaderContainer;
