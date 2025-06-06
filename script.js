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
