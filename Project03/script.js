const video = document.querySelector('.video');
const playButton = document.getElementById('playBtn');
const stopButton = document.getElementById('stopBtn');
const progressBar = document.getElementById('progressBar');
const time = document.getElementById('time');

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
    return true;
}

function stopVideo() {
    return true;
}

function setVideoProgress() {
    return true;
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updateIcon);
video.addEventListener('play', updateIcon);
video.addEventListener('timeupdate', updateProgess);

playButton.addEventListener('click', toggleVideoStatus);

stopButton.addEventListener('click', stopVideo);

progressBar.addEventListener('update', setVideoProgress);