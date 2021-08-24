function showtoast({ tittle = "", icon = "", message = "", duration = 3000 }) {
    const main = document.getElementById("khungthongbao");
    if (main) {
        const toast = document.createElement("div");

        toast.classList.add("toast", `toast_${tittle}`);
        toast.style.animation = "popup ease 2s, close ease 2s 6s forwards";
        toast.innerHTML = `<i class="${icon} icon1"></i>
    <div class="tittle">${message}</div>
    <div class="checkclick"></div>
    <i class="fas fa-times icon2"></i>
    `;
        //autoremove
        const autoremove = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 5000);
        //remove when click
        toast.onclick = function(e) {
            if (e.target.closest(".icon2")) {
                main.removeChild(toast);
                clearTimeout(autoremove);
            }
        };
        main.appendChild(toast);
    }
}

function showsuccess() {
    showtoast({
        tittle: "success",
        message: "Bạn đã đăng nhập thành công.",
        icon: "fa fa-check",
    });
}

function dangnhap() {
    const dangnhap = document.getElementById("nhap");
    if (dangnhap.value == "aa") {
        showsuccess();
    } else {
        showerror();
    }
}

function showerror() {
    showtoast({
        tittle: "error",
        message: "Bạn đã đăng nhập thất bại.",
        icon: "fas fa-exclamation-triangle ",
    });
}