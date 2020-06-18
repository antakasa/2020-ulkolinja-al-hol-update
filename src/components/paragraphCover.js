import React, { useContext} from 'react';
import './paragraphCover.css';
import Pagination from './pagination';
import BrandLogo from '../images/ulkolinja_logo_valkoinen.png';
import AreenaClip from './areenaClip';
import {LanguageContext} from "~/src/helpers/index.js"
const ParagraphCover = ({index, desktop, header, subHeader, header_eng, subHeader_eng}) => {
  const language = useContext(LanguageContext)
  if(language === "eng") {
    header = header_eng
    subHeader = subHeader_eng
  }


  return <>
    <div className={`cover ${desktop ? 'fullscreen' : ''}`}>
      <img
        className={`venezuela-ul-logo ${desktop ? 'desktop' : ''}`} // styles come for this class from header.css
        alt="Ulkolinjan logo"
        src={BrandLogo}
        style={{
          height: desktop ? "80px" : "",
          maxWidth: !desktop ? "200px" : "unset",
                  marginBottom: desktop ? "" : "30px",
                  padding: desktop ? "" : "0px",
        }}
      />
      <div className="title-box">
        <h2 className={`cover-title ${language === "eng" ? "bigger" : "big"}`}>{header}</h2>
        <h3 className="cover-subtitle">{subHeader}</h3>
      </div>
    </div>
    <div className="cover-gradient" />
  </>;
};

export default ParagraphCover;
