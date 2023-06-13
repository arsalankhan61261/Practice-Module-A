const video = document.querySelector('.video');
const playButton = document.getElementById('playBtn');
const stopButton = document.getElementById('stopBtn');
const progressBar = document.getElementById('progressBar');
const time = document.getElementById('time');
const controls = document.getElementById('controls');
const volume = document.getElementById('volume');
const volumeRange = document.querySelector('.volumeRange');
const volumeProgress = document.querySelector('.volumeProgress');
const volInput = document.querySelector('.input-div');

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
    console.log(progressBar.value);

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
    video.setAttribute = ('image', './Images/MonolinkOtherSide-Poster.jpg')
}

function setVideoProgress() {
    console.log(progressBar.value);
    video.currentTime = (+progressBar.value * video.duration) / 100;
    console.log(video.duration);
    console.log(video.currentTime);
}

function changeVolumeIcon() {
    const iconFade = document.querySelector('.fa-solid.fa-volume-high');
    iconFade.classList.add('fa-fade');
    // controls.style.margin = '0px 2px 0px 0px';
    volumeRange.style.opacity = '1';
    // volInput.style.height = '3px';
    volume.style.width = '52px';
    progressBar.style.marginLeft = '40px';
}

function defaultVolumeIcon() {
    const iconFadeRemove = document.querySelector('.fa-solid.fa-volume-high.fa-fade');
    iconFadeRemove.classList.remove('fa-fade');
    // volumeRange.style.width = '4px';
    volume.style.width = '0px';
    // volume.style.transition = 'width 1s';
    progressBar.style.marginLeft = '20px';
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updateIcon);
video.addEventListener('play', updateIcon);
video.addEventListener('timeupdate', updateProgess);

playButton.addEventListener('click', toggleVideoStatus);

stopButton.addEventListener('click', stopVideo);

progressBar.addEventListener('change', setVideoProgress);

volume.addEventListener('mousemove', changeVolumeIcon);
volume.addEventListener('mouseout', defaultVolumeIcon);

volumeRange.addEventListener('input', function(e) {
    volumeProgress.style.width = volumeRange.value + '%';
    video.volume = volumeRange.value / 100;
}, false)