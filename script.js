const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const albumArt = document.getElementById('album-art');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const playerContainer = document.querySelector('.player-container');
const playlistUl = document.getElementById('playlist');

// Song data
const songs = [
    {
        title: 'Mareez-E-Ishq',
        artist: 'Arijit Singh',
        src: './Accets/Music/Mareez-E-Ishq - Arijit Singh - 320Kbps.mp3', 
        albumArt: './Accets/Images/arjitsing.jpg'
    },
    {
        title: 'Nodivalandava',
        artist: 'Armaan Malik and Shreya Ghoshal',
        src: './Accets/Music/Nodivalandava.mp3',
        albumArt: './Accets/Images/Nodivalandava.jpeg'
    },
    {
        title: 'Hich Amuchi Praarthana',
        artist: ' नाज़नीन शेख',
        src: './Accets/Music/हीच आमुची प्रार्थना.mp3',
        albumArt: './Accets/Images/size_m.jpg'
    }
];

let songIndex = 0;
let isPlaying = false;

// Load song details
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    albumArt.src = song.albumArt;
    updatePlaylistActiveSong();
}

// Play song
function playSong() {
    isPlaying = true;
    playerContainer.classList.add('playing');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playerContainer.classList.remove('playing');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Update time displays
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    };

    if (duration) {
        durationSpan.textContent = formatTime(duration);
    }
    currentTimeSpan.textContent = formatTime(currentTime);
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Set volume
function setVolume() {
    audio.volume = volumeSlider.value;
}

// Populate playlist
function populatePlaylist() {
    playlistUl.innerHTML = ''; // Clear existing list
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.dataset.index = index;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistUl.appendChild(li);
    });
    updatePlaylistActiveSong();
}

// Update active song in playlist
function updatePlaylistActiveSong() {
    const playlistItems = document.querySelectorAll('#playlist li');
    playlistItems.forEach((item, index) => {
        if (index === songIndex) {
            item.classList.add('active-song');
        } else {
            item.classList.remove('active-song');
        }
    });
}

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong); // Play next song when current ends
volumeSlider.addEventListener('input', setVolume);

// Initial load
loadSong(songs[songIndex]);
populatePlaylist();