const api_audio = "http://localhost:3000/audios";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const seeked_music = $("#progress");
const buttonPlay = $(".play-music");
const iconPlay = $(".play-music i");
const buttonNext = $(".next-music");
const buttonPrev = $(".prev-music");
const buttonReturn = $(".return");
const buttonRandom = $(".random");
const imgMusic = $(".lists-music img");
const nameMusic = $(".music-name");
const singerMusic = $(".music-author");
let lists_music = [];
let currentIndex = 0;
let isPlaying = false;
let isReturn = false;
let isRandom = false;
var id;
const audio = $("#audio");

function start() {
    getData();
    handleEvent();
    setTimeout(loadDetail, 500);
    id = setInterval(loadTime, 500);
}

// get thông tin bài hát
function getData() {
    fetch(api_audio)
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Error " + response.status);
                return;
            }
            // parse response data
            response.json().then((data) => {
                lists_music = data.map((item_music) => {
                    return item_music;
                });
            });
        })
        .catch((err) => {
            console.log("Error :-S", err);
        });
}

// xử lý sự kiện
const handleEvent = function() {
    // chạy nhạc và tạm dừng nhạc
    buttonPlay.onclick = function() {
        if (!isPlaying) {
            play_music();
        } else {
            pause_music();
        }
    };

    // bài tiếp theo
    buttonNext.onclick = function() {
        next_music();
    };

    // bài trước
    buttonPrev.onclick = function() {
        prev_music();
    };

    // tua bài
    seeked_music.oninput = function() {
        const timeNow = $(".times .now");
        const timeRest = $(".times .full");
        let timeTest = (seeked_music.value * audio.duration) / 100;
        let time_rest = audio.duration - timeTest;
        timeNow.innerText = new Date(timeTest * 1000).toISOString().substr(14, 5);
        if (time_rest) {
            timeRest.innerText = new Date(time_rest * 1000)
                .toISOString()
                .substr(14, 5);
        }
    };
    seeked_music.onchange = function() {
        audio.currentTime = (seeked_music.value * audio.duration) / 100;
    };
    seeked_music.onmousedown = function() {
        clearInterval(id);
    };
    seeked_music.onmouseup = function() {
        id = setInterval(loadTime, 500);
    };
    buttonReturn.onclick = function() {
        if (!isReturn) {
            buttonRandom.classList.remove("active");
            buttonReturn.classList.add("active");
            isReturn = true;
            isRandom = false;
        } else {
            buttonReturn.classList.remove("active");
            isReturn = false;
        }
    };
    buttonRandom.onclick = function() {
        if (!isRandom) {
            buttonReturn.classList.remove("active");
            buttonRandom.classList.add("active");
            isRandom = true;
            isReturn = false;
        } else {
            buttonRandom.classList.remove("active");
            isRandom = false;
        }
    };
};

function prev_music() {
    if (isRandom) {
        random_music();
        if (currentIndex == 0) {
            currentIndex = lists_music.length - 1;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        } else {
            currentIndex -= 1;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        }
    } else {
        if (currentIndex == 0) {
            currentIndex = lists_music.length - 1;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        } else {
            currentIndex -= 1;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        }
    }

    loadDetail();
}

function next_music() {
    if (isRandom) {
        random_music();
        if (currentIndex >= lists_music.length - 1) {
            currentIndex = 0;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        } else {
            currentIndex += 1;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        }
    } else {
        if (currentIndex >= lists_music.length - 1) {
            currentIndex = 0;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        } else {
            currentIndex += 1;
            audio.src = `${lists_music[currentIndex]["audio-src"]}`;
            if (isPlaying) {
                play_music();
            } else {
                pause_music();
            }
        }
    }

    loadDetail();
}

function play_music() {
    audio.play();
    iconPlay.classList.remove("fas", "fa-play");
    iconPlay.classList.add("fas", "fa-pause");
    loadDetail();
    isPlaying = true;
}

function pause_music() {
    audio.pause();
    iconPlay.classList.remove("fas", "fa-pause");
    iconPlay.classList.add("fas", "fa-play");
    isPlaying = false;
}

// load thông tin bài hát
function loadDetail() {
    imgMusic.src = `${lists_music[currentIndex]["img-src"]}`;
    nameMusic.innerText = `${lists_music[currentIndex]["name"]}`;
    singerMusic.innerText = `${lists_music[currentIndex]["singer"]}`;
    if (audio.getAttribute("src") === "") {
        audio.src = `${lists_music[currentIndex]["audio-src"]}`;
    }
}

// load thời gian chạy bài hát
function loadTime() {
    const timeNow = $(".times .now");
    const timeRest = $(".times .full");
    let time_rest = audio.duration - audio.currentTime;
    if (audio.currentTime == audio.duration) {
        if (isReturn) {
            audio.currentTime = 0;
            play_music();
        } else {
            next_music();
        }
    }
    timeNow.innerText = new Date(audio.currentTime * 1000)
        .toISOString()
        .substr(14, 5);
    if (time_rest) {
        timeRest.innerText = new Date(time_rest * 1000).toISOString().substr(14, 5);
    }

    seeked_music.value = (audio.currentTime * 100) / audio.duration;
}

// lặp bài
function return_music() {
    audio.currentTime = 0;
}

// random bài
function random_music() {
    currentIndex = Math.floor(Math.random() * lists_music.length);
}

start();