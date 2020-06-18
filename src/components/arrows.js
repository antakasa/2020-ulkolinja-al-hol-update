import React from 'react';
import './arrows.css';
import Nuoli from '../images/nuoli.svg';
import nuoli from '../images/nuoli.svg';
import petrooliNuoli from '../images/nuoli_sininen.svg';
import PalloNuoli from '../images/nuoli_pallero.svg';
import Keyboard from '../images/keyboard.svg';
import ArrowDesktopCover from '../images/arrow_desktop_cover.svg';
import {data} from '../data';
const Arrows = ({type, desktop, index, goNext}) => {
  if (type === 'cover' && !desktop) {
    return <Nuoli className="venezuela-arrow right mobile bounce" />;
  } else if (type === 'cover' && desktop) {
    return (
     // <PalloNuoli className="venezuela-arrow right desktop cover pallo" />

        <>
      <ArrowDesktopCover onClick={goNext} className="venezuela-arrow right desktop graph"/>
        </>
      );


    } else if (type === 'graph' && index !== data.length - 1 && desktop) {
      return (
        <>
      <ArrowDesktopCover onClick={goNext} className="venezuela-arrow right desktop graph"/>
        </>
      );
  } else if (type !== 'cover' && index !== data.length - 1 && desktop) {
    return (
      <>
      <ArrowDesktopCover onClick={goNext} className="venezuela-arrow right desktop graph"/>
      </>
    );
  } else if (index === data.length - 1 && desktop) {
    return <Nuoli className="venezuela-arrow left desktop" />;
  } else {
    return null;
  }
};

export default Arrows;