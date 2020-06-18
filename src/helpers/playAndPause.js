const playAndPause = (audioOnOff) => {
  console.log(audioOnOff)
  const active = document.querySelector('.swiper-slide-active') || {};
  const prev = document.querySelector('.swiper-slide-prev') || {};
  const next = document.querySelector('.swiper-slide-next') || {};
  if (next && typeof next.querySelector === 'function') {
    const nextVideo = next.querySelector('video');
    if (nextVideo) {
      next.querySelector('video').pause();
    }
  }
  if (typeof prev.querySelector === 'function') {
    const prevVideo = prev.querySelector('video');
    if (prevVideo) {
      prevVideo.pause();
      prevVideo.oncanplay = function() {
        prevVideo.pause();
      };
    }
  }

  if (typeof active.querySelector === 'function') {
    const activeVideo = active.querySelector('video');
    if (activeVideo) {
      const activeVideo = active.querySelector('video');
      if (parseInt(activeVideo.readyState) === 4) {
        activeVideo.play();
        console.log(`asfasdf ${audioOnOff}`)
        if(audioOnOff) activeVideo.muted = false
        else activeVideo.muted = true
      } else {
        activeVideo.oncanplay = function() {
        if(audioOnOff) activeVideo.muted = false
        else activeVideo.muted = true
          activeVideo.play();
        };
      }
    }
  }
};

export default playAndPause;
