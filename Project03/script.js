const video = document.querySelector('.video');
const playButton = document.getElementById('playBtn');
const stopButton = document.getElementById('stopBtn');
const progressBar = document.getElementById('progressBar');
const time = document.getElementById('time');
const controls = document.getElementById('controls');


function toggleVideoStatus() {
    if ( video.paused ) {
        video.play();
    } else {
        video.pause();
    }
}

function updateIcon() {
    if ( video.paused ) {
        playButton.innerHTML = '<i class="fa-sharp fa-solid fa-circle-play"></i>'
    } else {
        playButton.innerHTML = '<i class="fa-sharp fa-solid fa-circle-pause fa-fade"></i>'
    }
}

function updateProgess() {
    progressBar.value = (video.currentTime / video.duration) * 100;

    let minutes = Math.floor(video.currentTime / 60);
    if ( minutes < 10 ) {
        minutes = '0' + String(minutes);
    }

    let seconds = Math.floor(video.currentTime % 60);
    if ( seconds < 10 ) {
        seconds = '0' + String(seconds);
    }

    time.innerHTML = `${minutes}:${seconds}`;
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

function setVideoProgress() {
    video.currentTime = (+progressBar.value * video.duration) / 100;
}

// function showControls() {
//     controls.style.visibility = 'visible';
// }

// function hideControls() {
//     controls.style.visibility = 'hidden ';
// }

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updateIcon);
video.addEventListener('play', updateIcon);
video.addEventListener('timeupdate', updateProgess);
// video.addEventListener('mouseover', showControls);
// video.addEventListener('mouseout', hideControls);

playButton.addEventListener('click', toggleVideoStatus);

stopButton.addEventListener('click', stopVideo);

progressBar.addEventListener('change', setVideoProgress);