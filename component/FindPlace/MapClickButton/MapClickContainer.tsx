import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {RootReducer} from "../../../store";
import {setClickPossible} from "../../../store/reducers/standardMarker/Reducer";
import MapClickButton from "./MapClickButton";

const MapClickButtonContainer = () => {
  const clickActive = useSelector(
    (state: RootReducer) => state.standardMarker.clickPossible
  );
  const dispatch = useDispatch();
  const changeClickPossible = () => {
    dispatch(setClickPossible(true));
  };
  return (
    <MapClickButton
      changeClickPossible={changeClickPossible}
      clickActive={clickActive}
    />
  );
};

export default MapClickButtonContainer;
