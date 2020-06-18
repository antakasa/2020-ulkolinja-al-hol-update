import React, { useContext, useState, useEffect, useRef } from "react";
import "./paragraphChapter.css";
import Pagination from "./pagination";
import ReactMarkdown from "react-markdown";
import { useWindowSize } from "../helpers/index.js";
import header from "../images/ulkolinja_logo_pieni.png";
import { LanguageContext } from "../helpers/index.js";
import { desktopBreakpointWidth } from "../helpers/constants.js";
import GridContext from "../helpers/gridContext"

const Content = ({ plainText, index, credits, bottom, text, time }) => {
  return (
    <div className={`swiper-text ${plainText ? "plaintext" : "chapter"}`}>
      <Pagination splitScreen index={index} />
      <div
        className={
          plainText
            ? `plaintext-container ${credits ? "chapter-credits" : ""}`
            : `chapter-container ${bottom ? "chapter-bottom" : ""}`
        }
      >
        {false && <p>{time}</p>}
        <ReactMarkdown linkTarget="_blank" source={text} />
      </div>
    </div>
  );
};

const ParagraphChapter = ({
  credits,
  plainText,
  index,
  bottom,
  center,
  text_location,
  text,
  time,
  credits_eng,
  text_eng,
}) => {
  const [width, height] = useWindowSize();

const thirdRowRef = useRef(null)
const GridRef = useRef(null)

const [thirdRowHeight, setThirdRowHeight] = useState(33)
const [gridHeight, setGridHeight] = useState(0)

useEffect( () => {
},[thirdRowHeight])
  const position = () => {
    if (bottom && width <= desktopBreakpointWidth)
      return "swiper-position-bottom";
    if (center || width >= desktopBreakpointWidth)
      return "swiper-position-center";
  };

  const whichValue = () => {
    const value = parseInt(useContext(GridContext).gridValues[index], 10)
    if(isNaN(value)) return parseInt(text_location, 10)
     else return value
  }

  const language = useContext(LanguageContext)
  const location = whichValue(); 


  if (language === "eng") {
    text = text_eng;
  }
  if (!text) return null;
  

  return (
    <div className={`${position()}`}>
      {!credits && width > 1025 && (
        <div className="desktop-grid" 
       ref={el => { if(!el || !el.clientHeight) return;setGridHeight(el.clientHeight) }} 
        >
          <div className="desktop-grid-row row-upper" style={{height: `${(100-thirdRowHeight)/2}%`}}>
            {[...Array(3).keys()].map((e, i) => {
              return (
                <div className="desktop-grid-cell" style={{visibility: i === location ? "visible" : "hidden", width: i === location ? "40%" : "30%"}}>
                  { i === location &&
                  <div className="desktop-grid-cell-content">
        <ReactMarkdown linkTarget="_blank" source={text} />
                  </div>
            }
                </div>
              );
            })}
          </div>
          <div className="desktop-grid-row row-middle" style={{height: `${(100-thirdRowHeight)/2}%`}} >
            {[...Array(3).keys()].map((e, i) => {
              return (
                <div className="desktop-grid-cell" style={{visibility: i + 3 === location ? "visible" : "hidden", width: i + 3 === location ? "40%" : "30%"}}>
               { i + 3 === location &&
                  <div className="desktop-grid-cell-content">
        <ReactMarkdown linkTarget="_blank" source={text} />
                  </div>
                }
                </div>
              );
            })}
          </div>
          <div className="desktop-grid-row row-lower" style={{height: `${thirdRowHeight}%`}} >
            {[...Array(3).keys()].map((e, i) => {
              return (
                <div className="desktop-grid-cell" style={{visibility: i + 6 === location ? "visible" : "hidden", width: i + 6 === location ? "40%" : "30%"}}>
                  { i + 6 === location &&
                  <div  
                  ref={el => { if(!el || !el.clientHeight) return; setThirdRowHeight(el.clientHeight / gridHeight * 100) }} 
                  className="desktop-grid-cell-content">
                    <ReactMarkdown linkTarget="_blank" source={text} />
                  </div>
                }
                </div>
              );
            })}
          </div>
        </div>
      )}
      {(width < 1025 || credits) && (
        <Content
          plainText={plainText}
          index={index}
          credits={credits}
          bottom={bottom}
          text={text}
          time={time}
        />
      )}
    </div>
  );
};

export default ParagraphChapter;
