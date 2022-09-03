import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {setActive} from "../../../store/reducers/mapClick/Reducer";
import MapClickButton from "./MapClickButton";

const MapClickButtonContainer = () => {
  const clickActive = useSelector(
    (state: RootReducer) => state.mapClick.active
  );
  const dispatch = useDispatch();
  const changeActive = () => {
    dispatch(setActive());
  };
  return (
    <MapClickButton changeActive={changeActive} clickActive={clickActive} />
  );
};

export default MapClickButtonContainer;
