let contMess = document.getElementsByClassName("cont-mess")[0],
    arrow   = document.getElementsByClassName("arrow")[0],
    findMyState = () => {
    let success = (position) => {
        let latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            goeApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(goeApiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            timePlayer(data.city);
            ifLoc("EG-C", "القاهرة");
            ifLoc("EG-DK", "الدقهلية");
            ifLoc("EG-BA*", "البحر الأحمر");
            ifLoc("EG-BH", "البحيرة");
            ifLoc("EG-FYM", "الفيوم");
            ifLoc("EG-GH", "الغربية");
            ifLoc("EG-ALX", "الأسكندرية");
            ifLoc("EG-IS", "الإسماعلية");
            ifLoc("EG-GZ", "الجيزة");
            ifLoc("EG-MN", "المنيا");
            ifLoc("EG-MNF", "المنوفية");
            ifLoc("EG-KB", "القليوبية");
            ifLoc("EG-LX*", "الأقصر");
            ifLoc("EG-WAD", "الوادي الجديد");
            ifLoc("EG-SUZ", "السويس");
            ifLoc("EG-SHR", "الشرقية");
            ifLoc("EG-SHR", "أسوان");
            ifLoc("EG-AST", "أسيوط");
            ifLoc("EG-BNS", "بنى سويف");
            ifLoc("EG-PTS", "بور سعيد");
            ifLoc("EG-DT", "دمياط");
            ifLoc("EG-JS*", "جنوب سيناء");
            ifLoc("EG-SIN", "شمال سيناء");
            ifLoc("EG-KFS", "كفر الشيخ");
            ifLoc("EG-MT", "مرسى مطروح");
            ifLoc("EG-KN", "قنا");
            ifLoc("EG-SHG", "سوهاج");
            
            function ifLoc(iso, loc) {
                if (data.principalSubdivisionCode == `${iso}`) {
                    titleCity.innerHTML = `${loc}`;
                    selectCity.value = `${loc}`;
                }
            }
        })
    }
    let error = () =>{
        contMess.style.display = "block" ;
    }
    navigator.geolocation.getCurrentPosition(success,error);
};
findMyState();
let cities    = [
    { arName:"القاهرة",name:"Al Qāhirah"},
    { arName:"الدقهلية",name:"Ad Daqahlīyah"},
    { arName:"البحر الأحمر",name:"Al Baḩr al Aḩmar"},
    { arName:"البحيرة",name:"Al Buḩayrah"},
    { arName:"الفيوم",name:"Al Fayyūm"},
    { arName:"الغربية",name:"Al Gharbīyah"},
    { arName:"الأسكندرية",name:"Al Iskandarīyah"},
    { arName:"الإسماعلية",name:"Ismailia"},
    { arName:"الجيزة",name:"Giza"},
    { arName:"المنيا",name:"Al Minyā"},
    { arName:"المنوفية",name:"Al Minūfīyah"},
    { arName:"القليوبية",name:"Al Qalyūbīyah"},
    { arName:"الأقصر",name:"Al Uqşur"},
    { arName:"الوادي الجديد",name:"Al Wādī al Jadīd"},
    { arName:"السويس",name:"As Suways"},
    { arName:"الشرقية",name:"Ash Sharqīyah"},
    { arName:"أسوان",name:"Aswān"},
    { arName:"أسيوط",name:"	Asyūţ"},
    { arName:"بنى سويف",name:"Banī Suwayf"},
    { arName:"بور سعيد",name:"Būr Sa‘īd"},
    { arName:"دمياط",name:"Dumyāţ"},
    { arName:"جنوب سيناء",name:"Janūb Sīnā'"},
    { arName:"شمال سيناء",name:"Shamāl Sīnā'"},
    { arName:"كفر الشيخ",name:"	Kafr ash Shaykh"},
    { arName:"مرسى مطروح",name:"Maţrūḩ"},
    { arName:"قنا",name:"Qinā"},
    { arName:"سوهاج",name:"Sūhāj"},
],
    selectCity=document.getElementsByClassName("select-city")[0],
    titleCity =document.getElementsByClassName("title")[0];
for(let city of cities) {
    const content = `<option>${city.arName}</option>`;
    selectCity.innerHTML += content;
}
selectCity.addEventListener("change",function(){
    arrow.style.display = "none";
    if (selectCity[0].classList.contains("option-delete")) {
        document.getElementsByClassName("option-delete")[0].remove();
    }
    let cityName = "";
    for (let city of cities) {
        if ( city.arName == this.value) {
            cityName = city.name;
        }
    }
    timePlayer(cityName);
    titleCity.innerHTML = this.value;
});
function timePlayer(cityName) {
   let params = {
        country: "EG",
        city : cityName,
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity',{
        params: params
    })
      .then(function (response) {
        var timings = response.data.data.timings;
        fillTime("fajr",timings.Fajr);
        fillTime("sunrise",timings.Sunrise);
        fillTime("aduher",timings.Dhuhr);
        fillTime("asr",timings.Asr);
        fillTime("maghreb",timings.Maghrib);
        fillTime("eshaa",timings.Isha);
        let readableDate = response.data.data.date.gregorian.date,
            weekDay = response.data.data.date.hijri.weekday.ar,
            hijriDate = `${response.data.data.date.hijri.day} ${response.data.data.date.hijri.month.ar}  ${response.data.data.date.hijri.year}`;
        document.getElementsByClassName("date")[0].innerHTML = `${weekDay} _ الموافق ${hijriDate} هجري _ والموافق ${readableDate} ميلادي .`;
      })
      .catch(function (error) {
        console.log(error);
      })
}
function fillTime(id,time) {
    if (parseInt(time) >= 12) {
        document.getElementsByClassName(id)[0].innerHTML = "0" + (parseInt(time)%12) +":"+time[3]+time[4]+ "م";
    } else {
        document.getElementsByClassName(id)[0].innerHTML = time + "ص";
    }
}
document.getElementsByClassName("button")[0].addEventListener("click",() => {
    contMess.style.display = "none" ;
    arrow.style.display = "block";
})
document.getElementsByClassName("button")[1].addEventListener("click",() => {
    contMess.style.display = "none" ;
    findMyState();
})
let today = new Date();
document.getElementsByClassName("footer")[0].innerHTML= today.getFullYear();