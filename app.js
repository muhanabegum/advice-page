function info(url) {
    return fetch(url).then(resp => resp.json())
}

var adviceAPI = { info }

function getAdvice() {
    adviceAPI.info("https://api.adviceslip.com/advice").then(data => addAdvice(data['slip']['advice']))
}

var colours = ["#D3D3D3", "#BDBDBD", "#9E9E9E", "#7D7D7D", "#696969", "#D9D8D6", 
				 "#70706F", "#7D7D7A", "#8E8D8D", "#A1A2A3", "#B3B6B5", "#BEC0C2"]
var adviceP = document.querySelector("h2#advice")
var bground = document.querySelector("body")

function addAdvice(advice) {
    adviceP.innerText = advice;
    let coloursRnd = Math.floor(Math.random()*colours.length);
    bground.style.backgroundColor = colours[coloursRnd]
}

var moreButton = document.querySelector("button")
moreButton.addEventListener("click", ()=> getAdvice())

document.body.onload = getAdvice
