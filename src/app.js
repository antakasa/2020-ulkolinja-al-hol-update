import './index.css';
import 'swiper/dist/css/swiper.css';
import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import ReactDOM from 'react-dom';
import {useWindowSize} from './helpers/index.js';
import {Swiper, Div100VhMinusYleHeader, Header} from './components/index.js';
import {data} from './data';
import LanguageContext from "./helpers/languageContext";
import AudioContext from "./helpers/audioContext";
const App = () => {
  document.body.style.margin = '0';

  const [currentIndex, updateCurrentIndex] = useState(0);
  const [nextSlideFunc, storeNextSlideFunc] = useState(() => () => null);
  const [width, height] = useWindowSize();
  const [audioOnOff, toggleAudio] = useState(false);
  return (
    
    <div className={'app'}>
    <AudioContext.Provider value={{toggleAudio, audioOnOff}}>
      <Header
        index={currentIndex}
        nextSlideFunc={nextSlideFunc}
        mobile={width < 900}
      />
      <Div100VhMinusYleHeader>
        <Swiper
          data={data}
          storeNextSlideFunc={storeNextSlideFunc}
          index={currentIndex}
          updateCurrentIndex={updateCurrentIndex}
        />
      </Div100VhMinusYleHeader>
      </AudioContext.Provider>
    </div>
  );
};
const startApp = async (root, parameters) => {
ReactDOM.render(
<LanguageContext.Provider value={parameters.lang}>
<App />
</LanguageContext.Provider>, root);
};
export default startApp;
