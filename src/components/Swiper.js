import React, { useState, useEffect, useContext } from "react";
import { playAndPause } from "../helpers/index.js";
import { Slide, LoadingOverlay } from "./index.js";
import {
  AnalyticsMethods as Analytics,
  lazyHelpers,
} from "../helpers/index.js";
import Swiper from "react-id-swiper";
import GridContext from "../helpers/gridContext";
import ContextDevTool from "react-context-devtool";

import AudioContext from "../helpers/audioContext";

const SetupSwiper = ({
  data,
  index,
  updateCurrentIndex,
  storeNextSlideFunc,
}) => {
  const [swiper, updateSwiper] = useState(null);
  const [initialized, initDone] = useState(false);
  const [coverImageLoaded, triggerCoverLoaded] = useState(false);
  const { updateData } = useContext(GridContext);
  const [gridValues, updateGridvalue] = useState({});

  const audioSettings = useContext(AudioContext);
  const giveAudioOnOff = () => audioSettings.audioOnOff;
  const params = {
    getSwiper: updateSwiper,
    init: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    preloadImages: false,
    effect: "none",
    direction: "vertical",
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    speed: 0,
    noSwiping: true,
    on: {
      slideChangeTransitionEnd: () => {
        playAndPause(audioSettings.audioOnOff);
      },
    },
  };

  useEffect(() => {
    if (swiper !== null) {
      //window.swiper = swiper;

      swiper.on("init", () => {
        lazyHelpers.initialize();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextVideo(); // eka video
        initDone(true);
        Analytics.registerEvent(`cover`);
        storeNextSlideFunc(() => () => goNext());
        document.body.onkeydown = function (e) {
          if (e.keyCode == 38) {
            // top
            //swiper.slidePrev();
          } else if (e.keyCode == 40) {
            // bottom
            // swiper.slideNext();
          }

          const keycodes = [49, 50, 51, 52, 53, 54, 55, 56, 57];
          if (keycodes.indexOf(e.keyCode) > -1) {
            updateGridvalue((prevState) => ({
              ...prevState,
              [swiper.realIndex]: keycodes.indexOf(e.keyCode),
            }));
          }
        };
      });
      swiper.init();
      swiper.on("slideChange", () => {
        lazyHelpers.loadNextVideo(); // eka video
        lazyHelpers.loadNextPic();
        updateCurrentIndex(swiper.realIndex);
        Analytics.registerEvent(`slide${swiper.realIndex}`);

        const nextSlide = document.querySelector(".swiper-slide-next");
        const nextVideo = nextSlide.querySelector("video");
        if (nextVideo && !audioSettings.audioOnOff) {
          nextSlide.querySelector("video").muted = true;
        }
        if (nextVideo && audioSettings.audioOnOff) {
          nextSlide.querySelector("video").muted = false;
        }
        if (nextSlide) {
          const nextSibling = nextSlide.nextSibling;
          if (!nextSibling) return;
          const nextSiblingVideo = nextSibling.querySelector("video");
          if (!nextSiblingVideo) return;
          const readyState = nextSiblingVideo.readyState;
          console.log(readyState);
          if (readyState !== 4) {
            //swiper.allowSlideNext = false;
            nextSiblingVideo.oncanplay = () => {
              //  swiper.allowSlideNext = true
            };
          }
        }
      });
    }
  }, [swiper]);

  useEffect(() => {
    if (!swiper) return;
    const active = document.querySelector(".swiper-slide-active") 
    if (active) {
      const activeVideo = active.querySelector("video");
      if(activeVideo) activeVideo.muted = !audioSettings.audioOnOff;
    } 
    swiper.on("slideChangeTransitionEnd", () => {
      playAndPause(audioSettings.audioOnOff);
    });
  }, [audioSettings.audioOnOff]);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={coverImageLoaded && initialized} />
      <GridContext.Provider value={{ gridValues }}>
        <ContextDevTool
          context={GridContext}
          id="uniqContextId"
          displayName="Context Display Name"
        />
        <Swiper {...params}>
          {data.map((e, i) => (
            <div key={i}>
              <Slide
                e={e}
                prevClickAvailable={initialized && index !== 0}
                nextClickAvailable={initialized && index !== data.length - 1}
                goNext={goNext}
                index={index}
                goPrev={goPrev}
                triggerCoverLoaded={triggerCoverLoaded}
                swiper={swiper}
              />
            </div>
          ))}
        </Swiper>
      </GridContext.Provider>
    </>
  );
};

export default SetupSwiper;
