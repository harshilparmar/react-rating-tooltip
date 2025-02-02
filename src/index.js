import React, { Component } from "react";
import "./App.css";
import Star from "./useStar";
import PropTypes from "prop-types";

const Rating = (props) => {
  const [current, setcurrent] = useState(props.defaultRating);
  const [hover, sethover] = useState(-1);

  const setSelected = (index) => {
    const { clearRating, ratingValue, onChange } = props;
    if (clearRating && current === index + 1) {
      setcurrent(0);
      sethover(-1);
      onChange(0, "-");
    } else {
      setcurrent(index + 1);
      onChange(index + 1, ratingValue ? ratingValue[index] : "");
    }
  };

  const onHover = (index) => {
    sethover(index + 1);
  };

  const onMouseLeave = () => {
    sethover(-1);
  };

  const {
    max,
    counterPosition,
    textPosition,
    tooltipContent,
    ratingValue,
    styleConfig,
    disabled,
  } = props;
  const stars = new Array(max);
  const currentValue = hover >= 0 ? hover : current;
  stars.forEach((star, index) => {
    star[index] = (
      <Star
        tooltipStyle={
          styleConfig && styleConfig.tooltipStyle
            ? styleConfig.tooltipStyle
            : {}
        }
        tpText={
          tooltipContent && tooltipContent[index] ? tooltipContent[index] : null
        }
        selected={index < currentValue ? true : false}
        key={index}
        onMouseLeave={disabled ? () => {} : onMouseLeave}
        onHover={disabled ? () => {} : onHover}
        index={index}
        selectStar={disabled ? () => {} : setSelected}
        InActiveComponent={props.InActiveComponent}
        ActiveComponent={props.ActiveComponent}
      />
    );
  });

  if (counterPosition) {
    counterPosition === "left"
      ? stars.unshift(
          <div
            key={stars.length + 1}
            style={
              styleConfig && styleConfig.counterStyle
                ? styleConfig.counterStyle
                : {}
            }
          >
            {current}
          </div>
        )
      : stars.push(
          <div
            key={stars.length + 1}
            style={
              styleConfig && styleConfig.counterStyle
                ? styleConfig.counterStyle
                : {}
            }
          >
            {current}
          </div>
        );
  }
  if (textPosition) {
    textPosition === "left"
      ? stars.unshift(
          <div
            key={stars.length + 1}
            style={
              styleConfig && styleConfig.statusStyle
                ? styleConfig.statusStyle
                : {}
            }
          >
            {ratingValue && ratingValue[current - 1]
              ? ratingValue[current - 1]
              : "-"}
          </div>
        )
      : stars.push(
          <div
            key={stars.length + 1}
            style={
              styleConfig && styleConfig.statusStyle
                ? styleConfig.statusStyle
                : {}
            }
          >
            {ratingValue && ratingValue[current - 1]
              ? ratingValue[current - 1]
              : "-"}
          </div>
        );
  }

  return (
    <div>
      <div className="wrap-container">
        <div
          className={"rating-container"}
          style={
            styleConfig && styleConfig.starContainer
              ? styleConfig.starContainer
              : {}
          }
        >
          {stars}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  max: PropTypes.number.isRequired,
  defaultRating: PropTypes.number,
  counterPosition: PropTypes.oneOf(["left", "right"]),
  clearRating: PropTypes.bool,
  disabled: PropTypes.bool,
  textPosition: PropTypes.oneOf(["left", "right"]),
  tooltipContent: PropTypes.array,
  ratingValue: PropTypes.array,
  styleConfig: PropTypes.shape({
    counterStyle: PropTypes.object,
    starContainer: PropTypes.object,
    statusStyle: PropTypes.object,
    tooltipStyle: PropTypes.object,
  }),
  onChange: PropTypes.func.isRequired,
  ActiveComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
    .isRequired,
  InActiveComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
    .isRequired,
};

Rating.defaultProps = {
  clearRating: true,
  disabled: false,
  defaultRating: 0,
  styleConfig: {
    counterStyle: {
      height: "28px",
      backgroundColor: "#F58220",
      paddingLeft: "12px",
      paddingRight: "12px",
      color: "#FFF",
      lineHeight: "28px",
    },
    starContainer: {
      fontSize: "24px",
      backgroundColor: "#F2F2F2",
      height: "28px",
    },
    statusStyle: {
      height: "28px",
      backgroundColor: "#F58220",
      paddingLeft: "12px",
      paddingRight: "12px",
      color: "#FFF",
      lineHeight: "28px",
      minWidth: "100px",
      fontSize: "18px",
      textAlign: "center",
    },
    tooltipStyle: {
      fontSize: "14px",
      padding: "5px",
    },
  },
};

export default Rating;
