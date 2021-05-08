import { useState } from "react";

const useStar = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const [showTooltip, setShowTooltip] = useState(false);
  const previousSelection = useRef(selected);
  useEffect(() => {
    const { selected } = props;
    if (selected !== previousSelection) {
      setSelected(selected);
    }
  }, [selected]);

  const onHover = () => {
    props.onHover(props.index);
    setShowTooltip(true);
  };
  const onMouseLeave = () => {
    props.onMouseLeave();
    setShowTooltip(false);
  };
  const selectStar = () => {
    props.selectStar(props.index);
  };

  return (
    <div
      key={props.key}
      onClick={selectStar}
      onMouseOver={onHover}
      onMouseOut={onMouseLeave}
      className="tp-container"
    >
      {state.selected ? props.ActiveComponent : props.InActiveComponent}
      {state.showTooltip && props.tpText && (
        <span className="tooltiptext" style={props.tooltipStyle}>
          {props.tpText}
        </span>
      )}
    </div>
  );
};

export default useStar;
