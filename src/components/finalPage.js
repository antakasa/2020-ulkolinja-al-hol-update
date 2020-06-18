import React, { useContext }from 'react';
import './paragraphCover.css';
import Pagination from './pagination';
import BrandLogo from '../images/ulkolinja_logo_valkoinen.png';
import BrandLogoBlack from "../images/brandlogo-black.png";
import AreenaClip from './areenaClip';
import ShareButtons from './shareButtons';
import {data} from '../data';
import {useWindowSize} from "../helpers/index.js"
import {LanguageContext} from '../helpers/index.js';
const FinalPage = ({index, swiper, areenaId}) => {
  const shouldRenderAreena = () => {
    if (swiper && swiper.realIndex) {
      const index = swiper.realIndex;
      return data[index].type === 'finalPage';
    } else {
      return false;
    }
  };


  const language = useContext(LanguageContext)
  if(language === "eng") {
  
  }
  const [width, height] = useWindowSize();
  return <>
    <div className="cover cover-middle cover-final">
      <img
        className={`${width > 1050 ? "venezuela-ul-logo desktop" : "cover-brand-image"}`}
        alt="Ulkolinjan logo"
        src={width < 1050 ? BrandLogo : BrandLogo }
      />
      <h2 className="cover-title big">{language === "eng" ? "For deeper insight" : "Tästä pääset syvemmälle"}</h2>
      <AreenaClip id={areenaId} renderNow={shouldRenderAreena()} />
      <ShareButtons url={window.location.href} />
    </div>
    <div className="cover-gradient" />
  </>;
};

export default FinalPage;
