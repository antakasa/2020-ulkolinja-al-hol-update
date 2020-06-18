import React, {useContext} from "react";
import Pagination from "./pagination";
import "./header.css";
import { data } from "../data";
import Tap from "../images/tap_toka.svg";
import logo from "../images/ulkolinja_logo_valkoinen.png";
import logoB from "../images/brandlogo-black.png";
import VoiceOn from "../images/voice_on.svg";
import VoiceOff from "../images/VoiceOff.svg";
import AudioContext from "../helpers/audioContext";
const Header = ({ index, splitScreen, nextSlideFunc, mobile }) => {
  const audioSettings = useContext(AudioContext)


  const cssClasses = () => {
    if (!splitScreen) {
      return "pagination full-screen-pagination";
    } else if (splitScreen) {
      return "pagination split-screen-pagination";
    } else {
      return "pagination";
    }
  };

  const slide = data[index];
  let notVisible = () => {
   
    const testBooleans = [slide.type === "finalPage", slide.credits];
    if (testBooleans.indexOf(true) >= 0) {
      return true;
    } else return false;
  };

  ["finalPage", "credits1", "credits2"]; // logo not visible on these slides
  return (
    <div className={"venezuela-header"}>
      <Pagination mobile={mobile} index={index} />
      {index > 0 && (
        <div className="logo-and-instructions">
          {
            <>
              <img
                src={data[index].type === "graph" ? logoB : logo}
                className={
                  mobile ? "venezuela-ul-logo" : "venezuela-ul-logo desktop"
                }
                alt="Ulkolinjan logo"
                style={{
                  visibility: notVisible() ? "hidden" : "",
                }}
              />
              {mobile && index !== data.length - 1 && (
                <div onClick={() => nextSlideFunc()}>
                  <Tap />
                </div>
              )}
            </>
          }
        </div>
      )}

      {(!mobile || index === 0) && !audioSettings.audioOnOff && (slide.type !== "finalPage" || !slide.credits) &&   
      <VoiceOff
        style={{
          width: "40px",  
          top: mobile ? "-15px" : "60px",
          position: "relative",
          right: "calc(-100vw + 65px)",
          cursor: "pointer",
          zIndex: 999
        }}
        onClick={() => audioSettings.toggleAudio(true)}
      />
      }
      {(!mobile || index === 0) && audioSettings.audioOnOff && (slide.type !== "finalPage" || !slide.credits ) &&   
      <VoiceOn
        style={{
          width: "40px",
          top: mobile ? "-15px" : "60px",
          position: "relative",
          right: "calc(-100vw + 65px)",
          cursor: "pointer",
          zIndex: 999
        }}
        onClick={() => audioSettings.toggleAudio(false)}
      />
    }
    </div>
  );
};

export default Header;
