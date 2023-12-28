const tempfield = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 p img");
const weatherfield = document.querySelector(".weather3 span");
const form = document.querySelector("form");
const searchfield = document.querySelector(".searchfield");
const button = document.querySelector("button");


target = "Mahoba, india";

const fetchdata = async () => {

    try {
        const url = `
        https://api.weatherapi.com/v1/current.json?key=6f10b4e923c242228f492716232805&q=${target}`;
    
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    
        const {
            current: {temp_c, condition: {icon, text}},
            location: {name, localtime},
        } =  data;
    
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location Not Found");
    }

};

function updateDom(temperature, city, time, emoji, text){
    const exactDate = time.split(" ")[0]       //Date
    const exacTime = time.split(" ")[1]       //time
    const exactDay = getDayName(new Date(exactDate).getDay());
    // console.log(exactDay);

    tempfield.innerText = temperature + "°";
    cityfield.innerText = city;
    datefield.innerText = exacTime + " " + exactDay+ " " + exactDate;
    emojifield.src = emoji;
    weatherfield.innerText = text;

}

function getDayName(day){
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wedneday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        
        default:
            break;
    }
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    target = searchfield.value;
    fetchdata();
})

fetchdata();
