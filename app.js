function info(url) {
    return fetch(url).then(resp => resp.json())
}

var adviceAPI = { info }

function getAdvice() {
    adviceAPI.info("https://api.adviceslip.com/advice").then(data => addAdvice(data['slip']['advice']))
}

var adviceP = document.querySelector("h2#advice")

function addAdvice(advice) {
    adviceP.innerText = advice;
}

var moreButton = document.querySelector("button")
moreButton.addEventListener("click", ()=> getAdvice())

document.body.onload = getAdvice
