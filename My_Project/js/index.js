const show_bang_thongbao = document.querySelector(".khung_thongbao");
const exits_all_bang = document.querySelector("body");
const show_setting_thongbao = document.querySelector(".titlle_thongbao-icon");
const show_bang_user = document.querySelector(".khung_user");
const getSlide = document.getElementById("slide");
const imgs = [
    `url("assets/img/slide/slide_0.jpg")`,
    `url("assets/img/slide/slide_1.jpg")`,
    `url("assets/img/slide/slide_2.jpg")`,
];
var duration = 8000;
show_bang_thongbao.addEventListener("click", function(event) {
    show_bang_thongbao.classList.add("bang_thongbao_active");
    show_setting_thongbao.classList.remove("thongbao_icon_setting_active");
    show_bang_user.classList.remove("bang_hoso_active");

    event.stopPropagation();
});
show_setting_thongbao.addEventListener("click", function(event) {
    show_setting_thongbao.classList.add("thongbao_icon_setting_active");
    event.stopPropagation();
});
show_bang_user.addEventListener("click", function(event) {
    show_bang_user.classList.add("bang_hoso_active");
    event.stopPropagation();
    show_bang_thongbao.classList.remove("bang_thongbao_active");
});

exits_all_bang.addEventListener("click", function() {
    show_bang_thongbao.classList.remove("bang_thongbao_active");
    show_setting_thongbao.classList.remove("thongbao_icon_setting_active");
    show_bang_user.classList.remove("bang_hoso_active");
});

function choice_slide(index) {
    console.log(index);
    getSlide.style.backgroundImage = imgs[index];
    animation();
    light_dot();
}

function animation() {
    getSlide.classList.add("animation");
    setTimeout(remove_anime, 1000);
}

function remove_anime() {
    if (document.querySelector(".animation")) {
        getSlide.classList.remove("animation");
    }
}
setInterval(next_slide, duration);

function next_slide() {
    if (getSlide.style.backgroundImage == imgs[0]) {
        index = 1;
    }
    if (getSlide.style.backgroundImage == imgs[1]) {
        index = 2;
    }
    if (getSlide.style.backgroundImage == imgs[2]) {
        index = 0;
    }
    getSlide.style.backgroundImage = imgs[index];
    light_dot();
    animation();
}

function return_slide() {
    if (getSlide.style.backgroundImage == imgs[0]) {
        index = 2;
    }
    if (getSlide.style.backgroundImage == imgs[1]) {
        index = 0;
    }
    if (getSlide.style.backgroundImage == imgs[2]) {
        index = 1;
    }
    getSlide.style.backgroundImage = imgs[index];
    light_dot();
    animation();
}

function light_dot() {
    if (getSlide.style.backgroundImage == imgs[0]) {
        if (document.getElementById("dot2") || document.getElementById("dot3")) {
            document.getElementById("dot2").classList.remove("page_active");
            document.getElementById("dot3").classList.remove("page_active");
        }
        document.getElementById("dot1").classList.add("page_active");
    }
    if (getSlide.style.backgroundImage == imgs[1]) {
        if (document.getElementById("dot1") || document.getElementById("dot3")) {
            document.getElementById("dot1").classList.remove("page_active");
            document.getElementById("dot3").classList.remove("page_active");
        }
        document.getElementById("dot2").classList.add("page_active");
    }
    if (getSlide.style.backgroundImage == imgs[2]) {
        if (document.getElementById("dot2") || document.getElementById("dot1")) {
            document.getElementById("dot2").classList.remove("page_active");
            document.getElementById("dot1").classList.remove("page_active");
        }
        document.getElementById("dot3").classList.add("page_active");
    }
}