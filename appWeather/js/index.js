const apiid = "76da28f73e11d9aaf56687e14e407f02";
const searchInput = document.querySelector(".inputtimkiem");
const searchIcon = document.querySelector(".icontimkiem");
const nhietdo = document.querySelector(".nhietdo");
const thanhpho = document.querySelector(".thanhpho");
const trangthai = document.querySelector(".trangthai");
const camnhan = document.querySelector(".nhietdo1");
const mattroimoc = document.querySelector(".mattroimoc1");
const mattroilan = document.querySelector(".mattroilan1");
const iconthoitiet = document.querySelector(".iconthoitiet");
var countryId;
const nativeCountry = document.querySelector(".nativeName");
const tiente = document.querySelector(".loaitien");
const thudo = document.querySelector(".thudo");
const muigio = document.querySelector(".muigio");

searchIcon.addEventListener("click", () => {
    load(searchInput);
});

searchInput.addEventListener("keypress", function(event) {
    if (event.which == 13) {
        load(searchInput);
    }
});

function load(a) {
    if (searchInput.value == "") {
        alert("Vui lòng nhập tên thành phố ... !");
    } else {
        fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${a.value}&appid=${apiid}&units=metric&lang=vi`
            )
            .then(async(res) => {
                const data = await res.json();

                thanhpho.innerHTML = data.name;
                nhietdo.innerHTML = Math.round(data.main.temp);
                trangthai.innerHTML = data.weather[0].description;
                iconthoitiet.setAttribute(
                    "src",
                    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                );
                iconthoitiet.setAttribute(
                    "style",
                    "width: 120px !important; padding-top : 0px !important"
                );
                mattroimoc.innerHTML = moment.unix(data.sys.sunrise).format("H:mm");
                mattroilan.innerHTML = moment.unix(data.sys.sunset).format("H:mm");
                camnhan.innerHTML = Math.round(data.main.feels_like);
                countryId = data.sys.country;
                load1(countryId);
            })
            .catch(async(err) => {
                alert("Không tìm thấy thành phố ...");
            });
    }
}

function load1(a) {
    if (searchInput.value == "") {
        alert("Vui lòng nhập tên thành phố ...");
    } else {
        fetch(`https://restcountries.eu/rest/v2/alpha/${a}`).then(async(res) => {
            const data = await res.json();

            nativeCountry.innerHTML = data.nativeName;
            tiente.innerHTML = data.currencies[0].code;
            thudo.innerHTML = data.capital;
            muigio.innerHTML = data.timezones[0];
        });
    }
}