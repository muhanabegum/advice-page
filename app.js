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

  var snowflakes = [];

  var browserWidth;
  var browserHeight;

  var numberOfSnowflakes = 60;

  var resetPosition = false;


  var enableAnimations = false;
  var reduceMotionQuery = matchMedia("(prefers-reduced-motion)");


  function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
      enableAnimations = false;
    } else { 
      enableAnimations = true;
    }
  }
  setAccessibilityState();

  reduceMotionQuery.addListener(setAccessibilityState);

  function setup() {
    if (enableAnimations) {
      window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
      window.addEventListener("resize", setResetFlag, false);
    }
  }
  setup();

  function Snowflake(element, speed, xPos, yPos) {
    // set initial snowflake properties
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = 1;

    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;

    this.element.style.opacity = (.1 + Math.random()) / 3;
  }

 
  Snowflake.prototype.update = function () {
    this.counter += this.speed / 5000;
    this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
    this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
    this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);

    setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);

    if (this.yPos > browserHeight) {
      this.yPos = -50;
    }
  }

  function setTransform(xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
  }

  function generateSnowflakes() {

    var originalSnowflake = document.querySelector(".snowflake");

    var snowflakeContainer = originalSnowflake.parentNode;
    snowflakeContainer.style.display = "block";

    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    for (var i = 0; i < numberOfSnowflakes; i++) {

      var snowflakeClone = originalSnowflake.cloneNode(true);
      snowflakeContainer.appendChild(snowflakeClone);

      var initialXPos = getPosition(50, browserWidth);
      var initialYPos = getPosition(50, browserHeight);
      var speed = 5 + Math.random() * 40;

      var snowflakeObject = new Snowflake(snowflakeClone,
        speed,
        initialXPos,
        initialYPos);
      snowflakes.push(snowflakeObject);
    }

    snowflakeContainer.removeChild(originalSnowflake);

    moveSnowflakes();
  }


  function moveSnowflakes() {

    if (enableAnimations) {
      for (var i = 0; i < snowflakes.length; i++) {
        var snowflake = snowflakes[i];
        snowflake.update();
      }      
    }

    if (resetPosition) {
      browserWidth = document.documentElement.clientWidth;
      browserHeight = document.documentElement.clientHeight;

      for (var i = 0; i < snowflakes.length; i++) {
        var snowflake = snowflakes[i];

        snowflake.xPos = getPosition(50, browserWidth);
        snowflake.yPos = getPosition(50, browserHeight);
      }

      resetPosition = false;
    }

    requestAnimationFrame(moveSnowflakes);
  }


  function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
  }

  function setResetFlag(e) {
    resetPosition = true;
  }