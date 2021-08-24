const show_bang_thongbao = document.querySelector(".khung_thongbao");
const exits_all_bang = document.querySelector("body");
const show_setting_thongbao = document.querySelector(".titlle_thongbao-icon");
const show_bang_user = document.querySelector(".khung_user");

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