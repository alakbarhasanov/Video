const playButton = document.querySelector(".play");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const videoElement = document.querySelector(".video");
const weakSpeed = document.querySelector(".weak")
const normalSpeed = document.querySelector(".normal")
const fastSpeed = document.querySelector(".fast")
const volumeHigh = document.querySelector(".volumeHigh")
const fullScreen = document.querySelector(".fullScreen")
const volumeRange = document.querySelector('#volumeRange');
const speedPlay = document.querySelector(".speedPlay")
const speed = document.querySelector(".speed")
const videoRange = document.querySelector("#videoRange")

let isPlaying = false;

speedPlay.addEventListener("click", function () {
    speed.classList.toggle("d-none")
})



let volume = false;

volumeHigh.addEventListener("click", volumeHighOrMark)

function volumeHighOrMark() {
    if (volume) {
        markVolume();
    } else {
        highVolume();
    }
}

function highVolume() {
    volume = true;
    volumeHigh.classList.replace("volumeHigh", "fa-volume-xmark")
    videoElement.muted = true;
}

function markVolume() {
    volume = false;
    volumeHigh.classList.replace("fa-volume-xmark", "volumeHigh")
    videoElement.muted = false;
}



playButton.addEventListener("click", playOrPauseVideo);


function playVideo() {
    videoElement.play();
    playButton.classList.replace("fa-play", "fa-pause");
    isPlaying = true;
}

function pauseVideo() {
    videoElement.pause();
    playButton.classList.replace("fa-pause", "fa-play");
    isPlaying = false;
}

function playOrPauseVideo() {
    if (isPlaying) {
        pauseVideo();
    } else {
        playVideo();
    }
}

prevButton.addEventListener("click", function () {
    videoElement.currentTime -= 5;
})

nextButton.addEventListener("click", function () {
    videoElement.currentTime += 5;
})

weakSpeed.addEventListener("click", function () {
    videoElement.playbackRate = 0.5;
})

normalSpeed.addEventListener("click", function () {
    videoElement.playbackRate = 1;
})

fastSpeed.addEventListener("click", function () {
    videoElement.playbackRate = 2;
})


fullScreen.addEventListener("click", function () {
    if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
    }
})


function setVolume() {
    videoElement.volume = volumeRange.value;
}



var videoDurationText = document.getElementById('videoDuration');

videoElement.addEventListener('loadedmetadata', function () {
    var totalSeconds = videoElement.duration;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    var formattedDuration = "0" + minutes + ' : ' + seconds;
    videoDurationText.textContent = formattedDuration;
});



var currentTimeText = document.getElementById('currentTime');

videoElement.addEventListener('timeupdate', function () {
    var currentSeconds = Math.floor(videoElement.currentTime % 60);
    var currentMinutes = Math.floor((videoElement.currentTime / 60) % 60);
    var formattedTime = pad(currentMinutes) + ':' + pad(currentSeconds);
    currentTimeText.textContent = formattedTime + "/";
});

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}


videoElement.addEventListener("loadedmetadata", function () {
    videoRange.max = videoElement.duration;
});

videoElement.addEventListener("timeupdate", function () {
    videoRange.value = videoElement.currentTime;
});

videoRange.addEventListener("input", function () {
    videoElement.currentTime = videoRange.value;
});



volumeRange.addEventListener("input",function(){
    var soundLevel = parseFloat(volumeRange.value);
    videoElement.volume = soundLevel;
    
    if (soundLevel === 0) {
        volumeHigh.classList.replace("volumeHigh", "fa-volume-xmark")
    } else {
        volumeHigh.classList.replace("fa-volume-xmark", "volumeHigh")
    }
})