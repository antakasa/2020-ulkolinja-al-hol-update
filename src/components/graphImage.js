import React, {useContext} from 'react';
import './graphImage.css';
import {LanguageContext} from '../helpers/index.js';
const GraphImage = ({src, src_eng, src_mobile_eng, src_mobile, desktop}) => {
  
  const language = useContext(LanguageContext)
  if(language === "eng") {
    src = src_eng
    src_mobile = src_mobile_eng
  }
  
  return (
    <>
      <img className="swiper-lazy graph-image" data-src={desktop ? src : src_mobile} />
  </>
  );
};

export default GraphImage;
