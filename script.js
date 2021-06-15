const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');
const songs = document.querySelectorAll('.sound-picker button');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');

const app = () => {

    const outlineLength = outline.getTotalLength();
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    const roundSeconds = (seconds) => {
        return (seconds < 10 ? '0' : '') + seconds;
    }
    
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    songs.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song)
        });
    })

    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${roundSeconds(Math.floor(duration % 60))}`
        });
    })

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        } else {
            song.pause();
            play.src = './svg/play.svg'
            video.pause();
        }
    }



    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = roundSeconds(Math.floor(elapsed % 60));
        let minutes = Math.floor(elapsed / 60);

        // Animate bar
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDasharray = progress; 
    
        // Animate text
        timeDisplay.textContent = `${minutes}:${seconds}`
    
        if(currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    }
}

app();