import React, {useContext} from 'react';

import {LanguageContext} from '../helpers/index.js';
const BackgroundStill = ({src, coverLoadedCallback, cover, desktopSrc}) => {
  const language = useContext(LanguageContext)
  if(language === "eng") {
  }
 return (
    <div className={`swiper-video ${desktopSrc ? 'fullscreen' : ''} `}>
      <img
        className="lazy-this swiper-video-player anchor-middle-center"
        onLoad={
          typeof coverLoadedCallback === 'function'
            ? () => coverLoadedCallback(true)
            : null
        }
        data-src={desktopSrc ? desktopSrc : src}
      />
    </div>
  );
};

export default BackgroundStill;
