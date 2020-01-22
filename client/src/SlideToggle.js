import React, { useEffect } from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggle } from "./redux/selectors";
import { toggle } from "./redux/actions";
import styled from "styled-components";
import { useDrag } from "react-use-gesture";
import { fetchDataStart } from "./redux/actions";
function SlideToggle({ toggled, doToggle, fetchDataStart }) {
  //const [toggle, setToggle] = React.useState(false);

  useEffect(() => {
    fetchDataStart();
  }, []);
  const [springState, setSpring] = useSpring(() => ({
    x: 0,
    opacity: 1,
    rotation: 0,
    background: "crimson",
    config: { mass: 5, tension: 500, friction: 60 },
    scale: 1
  }));

  const colorizer = (movement, down) => {
    return "green";
  };

  const rotator = (movement, down) => {
    if (movement > 120 && down) {
      return 90;
    } else if (movement < -150 && down) {
      return -180;
    } else {
      return 0;
    }
  };

  const bind = useDrag(state => {
    if (state.movement[0] > 130 && state.down) {
      state.cancel();
      doToggle();
      console.log(toggled);
    }

    setSpring({
      x: state.down ? state.movement[0] : 0,
      opacity: state.movement[0] > 300 && state.down ? 0 : 1,
      rotation: rotator(state.movement[0], state.down),
      background: colorizer(state.movement[0], state.down),
      scale: state.down ? 0.9 : 1
    });
  });

  return (
    <div>
      <Box
        {...bind()}
        style={{
          ...springState,
          x: "",
          opacity: "",

          transform: interpolate(
            [
              springState.x.interpolate(x => `translate3d(${x}px,0,0)`),
              springState.rotation.interpolate(r => `rotate(${r}deg)`),
              springState.scale.interpolate(s => `scale(${s})`)
            ],
            (x, rotation, scale) => `${x} ${rotation} ${scale}`
          )
        }}
      >
        BUY!!!
      </Box>
      <h1>{toggled && "munchikin"}</h1>
      <button onClick={() => doToggle()}>TOGGLE STATE</button>
    </div>
  );
}

const Box = styled(animated.button)`
  background: crimson;
  height: 100px;
  width: 100px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
const giveStateToProps = createStructuredSelector({ toggled: selectToggle });

const mapDispatchToProps = dispatch => {
  return {
    doToggle: () => dispatch(toggle()),
    fetchDataStart: () => dispatch(fetchDataStart())
  };
};

export default connect(giveStateToProps, mapDispatchToProps)(SlideToggle);
