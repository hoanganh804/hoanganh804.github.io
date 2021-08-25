const ovuongs = [...document.querySelectorAll(`.button_game`)];

let index = 1;

const check_win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

function start() {
    dien_o();
}
const list_x = [];
const list_o = [];

function dien_o() {
    ovuongs.forEach((ovuong, id) => {
        ovuong.addEventListener("click", () => {
            if (index < 10) {
                if (index % 2 == 1) {
                    if (!ovuong.classList.contains("activeX") &&
                        !ovuong.classList.contains("activeO")
                    ) {
                        ovuong.classList.add("activeX");
                        index++;
                        list_x.push(id);
                        list_x.sort();
                        setTimeout(checkWinX, 200);
                    }
                } else {
                    if (!ovuong.classList.contains("activeX") &&
                        !ovuong.classList.contains("activeO")
                    ) {
                        ovuong.classList.add("activeO");
                        index++;
                        list_o.push(id);
                        list_o.sort();
                        setTimeout(checkWinO, 200);
                    }
                }
            } else {
                restart();
            }
        });
    });
}

function checkWinX() {
    check_win.forEach((item_s) => {
        let a = item_s.reduce((varcheck, item) => {
            if (list_x.includes(item)) {
                varcheck++;
                return varcheck;
            } else {
                return varcheck;
            }
        }, 0);
        if (a === 3) {
            alert("X Win");
            restart();
        }
    });
}

function checkWinO() {
    check_win.forEach((item_s) => {
        let a = item_s.reduce((varcheck, item) => {
            if (list_o.includes(item)) {
                varcheck++;
                return varcheck;
            } else {
                return varcheck;
            }
        }, 0);
        if (a === 3) {
            alert("O Win");
            restart();
        }
    });
}

function restart() {
    location.reload();
}
start();