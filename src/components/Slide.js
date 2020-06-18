import React from 'react';
import {useWindowSize, playAndPause} from '../helpers/index.js';
import {Arrows} from './index.js';
import {
  determineBackgroundType,
  determineContentType,
} from '../helpers/index.js';
import { desktopBreakpointWidth } from "../helpers/constants.js";
const SlideContainer = ({
  e,
  triggerCoverLoaded,
  goPrev,
  index,
  goNext,
  swiper,
  prevClickAvailable,
  nextClickAvailable,
}) => {
  const [width, height] = useWindowSize();
  const isDesktop = width >= desktopBreakpointWidth;

  return (
    <div style={{height: '100%', userSelect: "none",
    background: e.type === "graph" ? "black" : "unset"
    }}>
      { width < desktopBreakpointWidth && <React.Fragment>
      {prevClickAvailable && <div onClick={goPrev} id="prev-catch" />}
      {nextClickAvailable && <div onClick={goNext} id="next-catch" />}
      </React.Fragment>
      }
      {determineBackgroundType(e, isDesktop, triggerCoverLoaded)}
      {determineContentType(index, e, isDesktop, swiper)}
      <Arrows type={e.type} desktop={isDesktop} index={index} goNext={goNext} />
    </div>
  );
};

export default SlideContainer;
