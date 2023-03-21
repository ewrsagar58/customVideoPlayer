const getVideoSrc = new URLSearchParams(window.location.search);
const videoSrc = decodeURIComponent(getVideoSrc.get('videoSrc'));
const videoLayer = document.getElementById('videoLayer');
const body = document.getElementById('body');
const videoControls = document.getElementById('videoControls');
const videoCon = document.getElementById('videoCon');
const range = document.getElementById('range');
const loading_bar = document.getElementById('loading_bar');
const playPause = document.getElementById('playPause');
const myVideo = document.getElementById('myVideo');
const volumeIcon = document.getElementById('volumeIcon');
const current_Time = document.getElementById('current_Time');
const forward = document.getElementById('forward');
const reward = document.getElementById('reward');
const for_back_inner_text = document.getElementById('for_back_inner_text');
const videoRange = document.getElementById('videoRange');
const fullScreen = document.getElementById('fullScreen');
myVideo.src = videoSrc;
window.addEventListener('load', () => {
    const windowLoading = document.querySelector('.windowLoading');
    myVideo.addEventListener('canplay', () => {
        windowLoading.style.display = 'none';
    })
});

const showLoader = () => {
    loading_bar.style.display = 'flex';
}
const hideLoader = () => {
    loading_bar.style.display = 'none';
}
if (myVideo.paused) {
    playPause.innerHTML = 'play_circle_outline';

} else {
    playPause.innerHTML = 'pause_circle_outline';
}
videoLayer.addEventListener('mousedown', () => {
    if ((videoControls.style.opacity == 1) && (videoLayer.style.opacity == 1)) {
        videoControls.style.opacity = 0;
        videoLayer.style.opacity = 0;
    } else {
        videoControls.style.opacity = 1;
        videoLayer.style.opacity = 1;
    }
});
videoCon.addEventListener('mousemove', () => {
    videoControls.style.opacity = 1;
    videoLayer.style.opacity = 1;
});
videoCon.addEventListener('mouseenter', () => {
    videoControls.style.opacity = 1;
    videoLayer.style.opacity = 1;
    const volumeOnMouseWheel = (event) => {
        const key = event.deltaY;
        if (key == "-108") {
            range.value++;
            myVideo.volume = `0.${(range.value == 10) ? 0 : range.value}`;
        };
        if (key == "108") {
            if (range.value >= 10) {
                range.value--;
                myVideo.volume = `0.${(range.value == 10) ? 0 : range.value}`;
            }
        };
        if (range.value == 10) {
            volumeIcon.innerHTML = 'volume_off';
        } else {
            volumeIcon.innerHTML = 'volume_up';
        }
    }
    videoCon.addEventListener("wheel", volumeOnMouseWheel);
});
videoCon.addEventListener('mouseleave', () => {
    if (myVideo.paused) {
        videoControls.style.opacity = 1;
        videoLayer.style.opacity = 1;
    } else {
        videoControls.style.opacity = 0;
        videoLayer.style.opacity = 0;
    };
});
myVideo.volume = `0.${range.value}`;
const volumeRange = () => {
    myVideo.volume = `0.${(range.value == 10) ? 0 : range.value}`;
    if (range.value == 10) {
        myVideo.muted = true;
        volumeIcon.innerHTML = 'volume_off';
    } else {
        myVideo.muted = false;
        volumeIcon.innerHTML = 'volume_up';
    }
}
const playPauseBtn = () => {
    if (myVideo.paused) {
        myVideo.play();
        playPause.innerHTML = 'pause_circle_outline';

    } else {
        myVideo.pause();
        playPause.innerHTML = 'play_circle_outline';
    }
}

const videoDurationTime = () => {
    const duration = myVideo.duration;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - (hours * 3600)) / 60);
    const seconds = Math.floor(duration - (hours * 3600) - (minutes * 60));
    const timeString = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    const fullVideoTime = document.getElementById('fullVideoTime');
    fullVideoTime.innerHTML = timeString;
}

myVideo.addEventListener('ended', () => {
    playPause.innerHTML = 'play_circle_outline';
    myVideo.currentTime = 0;
});
const volumeMuteUnmute = () => {
    if (myVideo.muted == false) {
        myVideo.muted = true;
        volumeIcon.innerHTML = 'volume_off';
    } else {
        myVideo.muted = false;
        volumeIcon.innerHTML = 'volume_up';
    }
}

const keysOnClick = (event) => {
    const key = event.keyCode;
    if (key == "32") {
        if (myVideo.paused) {
            myVideo.play();
            playPause.innerHTML = 'pause_circle_outline';

        } else {
            myVideo.pause();
            playPause.innerHTML = 'play_circle_outline';
        }
    };
    if (key == "39") {
        myVideo.currentTime += 5;
    };
    if (key == "37") {
        myVideo.currentTime -= 5;
    };
    if (key == "38") {
        range.value++;
        myVideo.volume = `0.${(range.value == 10) ? 0 : range.value}`;
    };
    if (key == "40") {
        if (range.value >= 10) {
            range.value--;
            myVideo.volume = `0.${(range.value == 10) ? 0 : range.value}`;
        }
    };
    if (range.value == 10) {
        volumeIcon.innerHTML = 'volume_off';
    } else {
        volumeIcon.innerHTML = 'volume_up';
    }
}

const fullScreenVideo = () => {
    if (fullScreen.innerHTML == 'fullscreen') {
        fullScreen.innerHTML = 'fullscreen_exit';
        if (videoCon.requestFullscreen) {
            videoCon.requestFullscreen();
        } else if (videoCon.webkitRequestFullscreen) { /* Safari */
            videoCon.webkitRequestFullscreen();
        } else if (videoCon.msRequestFullscreen) { /* IE11 */
            videoCon.msRequestFullscreen();
        }
    } else {
        fullScreen.innerHTML = 'fullscreen';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}
const videoForward = () => {
    myVideo.currentTime += 5;
    forward.style.transform = 'rotate(45deg)';
    for_back_inner_text.innerHTML = '<span>05 sec</span><i class="material-icons">fast_forward</i>';
    setTimeout(() => {
        forward.style.transform = 'rotate(0deg)';
        for_back_inner_text.innerHTML = null;
    }, 350);
}
const videoReward = () => {
    myVideo.currentTime -= 5;
    reward.style.transform = 'rotate(-45deg)';
    for_back_inner_text.innerHTML = '<i class="material-icons">fast_rewind</i> 05 sec';
    setTimeout(() => {
        reward.style.transform = 'rotate(0deg)';
        for_back_inner_text.innerHTML = null;
    }, 200);
}

myVideo.addEventListener('durationchange', () => {
    videoRange.max = Math.round(myVideo.duration);
});
videoRange.addEventListener('input', () => {
    myVideo.currentTime = videoRange.value;

});
const VideoTime = () => {
    videoRange.value = Math.round(myVideo.currentTime);
    const currentTime = myVideo.currentTime;
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const seconds = Math.floor((currentTime % 3600) % 60);
    const timeString = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    const currentVideoTime = document.getElementById('currentVideoTime');
    currentVideoTime.innerHTML = timeString;
}
myVideo.addEventListener('waiting', showLoader);
myVideo.addEventListener('playing', hideLoader);
myVideo.addEventListener("loadedmetadata", videoDurationTime);
playPause.addEventListener('click', playPauseBtn);
range.addEventListener('input', volumeRange);
volumeIcon.addEventListener('click', volumeMuteUnmute);
window.addEventListener('keydown', keysOnClick);
fullScreen.addEventListener('click', fullScreenVideo);
forward.addEventListener('click', videoForward)
reward.addEventListener('click', videoReward);
setInterval(VideoTime, 10);