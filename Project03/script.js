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
const highVolume = document.querySelector('.fa-volume-high');
const lowVolume = document.querySelector('.fa-volume-low');
const muteVolume = document.querySelector('.fa-volume-mute');

lowVolume.style.display = 'none';
muteVolume.style.display = 'none';

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
    volumeRange.style.opacity = '1';
    volume.style.width = '52px';
    progressBar.style.marginLeft = '40px';
    progressBar.style.transition = '0.1s';
}

function defaultVolumeIcon() {
    const iconFadeRemove = document.querySelector('.fa-solid.fa-volume-high.fa-fade');
    volume.style.width = '0px';
    progressBar.style.marginLeft = '20px';
    progressBar.style.transition = '0.5s';
}

function muteIcon() {
    if (muteVolume.style.display != '') {
        highVolume.style.display = 'none';
        lowVolume.style.display = 'none';
        muteVolume.style.display = '';
        video.volume = 0;
        volumeRange.value = 0;
        progressBar.style.marginLeft = '40px';
        progressBar.style.transition = '0.5s';
    } else {
        volumeRange.value = 50;
        video.volume = volumeRange.value / 100;
        muteVolume.style.display = 'none';
        lowVolume.style.display = '';
        progressBar.style.marginLeft = '40px';
        progressBar.style.transition = '0.5s';
        console.log('no');
    }
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

    if (volumeRange.value == 0) {
        highVolume.style.display = 'none';
        lowVolume.style.display = 'none';
        muteVolume.style.display = '';
    } else if (volumeRange.value <= 50) {
        highVolume.style.display = 'none';
        lowVolume.style.display = '';
        muteVolume.style.display = 'none';
    } else if (volumeRange.value >= 90) {
        highVolume.style.display = '';
        lowVolume.style.display = 'none';
        muteVolume.style.display = 'none';
    }
}, false)

lowVolume.addEventListener('click', muteIcon);
muteVolume.addEventListener('click', muteIcon);
highVolume.addEventListener('click', muteIcon);