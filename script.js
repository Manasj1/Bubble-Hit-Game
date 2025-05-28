var timer = 60;
var score = 0;
var hitrn = 0;
var hiscoreval = 0;
var timerint = null;
const smash = new Audio("music/brk.wav");
const over = new Audio("music/over.wav");
const click = new Audio("music/click.wav");
const hsound2 = new Audio("music/hsound.mp3");
const lvl = new Audio("music/lvl.mp3");
const tmr = new Audio("music/timer.mp3");

var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
btn2.style.display = "none";
document.getElementById("pbtm").style.display = "none";
document.getElementById("game1").innerHTML = `<h2>Press Start</h2>`;
function startGame() {
  click.play();
  hsound2.play();
  hsound2.currentTime = 0;
  btn2.style.display = "block";
  document.getElementById("game1").style.display = "none";
  document.getElementById("pbtm").style.display = "flex";
  document.getElementById("btn1").style.backgroundColor = "red";
  document.getElementById("btn1").style.border = "3px solid black";
  document.getElementById("btn1").style.transform = "none";
  document.querySelector("#pbtm").addEventListener("click", handleClick);
  score = 0;
  document.getElementById("scoreval").textContent = score;
  hitbtn();
  runTimer();
  makebubble();

  btn1.removeEventListener("click", startGame);
}

btn1.addEventListener("click", startGame);

function restartGame() {
  hsound2.pause();
  click.play();
  if (score > hiscore) {
    hiscoreval = score;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    document.getElementById(
      "hscore"
    ).innerHTML = `<h2>High score:${hiscoreval}</h2>`;
  }
  document.getElementById("pbtm").style.display = "flex";
  document.getElementById("game2").innerHTML = "";
  document.getElementById("game3").innerHTML = "";
  document.getElementById("crk").style.display = "none";
  document.querySelector("#pbtm").removeEventListener("click", handleClick);

  clearInterval(timerint);
  timer = 60;
  document.getElementById("timerval").textContent = timer;
  score = 0;
  document.getElementById("scoreval").textContent = score;
  document.getElementById("btn1").style.backgroundColor = "";
  document.getElementById("btn1").style.border = "";
  document.getElementById("btn1").style.transform = "";
  btn1.addEventListener("click", startGame);
}

btn2.addEventListener("click", restartGame);

function increaseScore() {
  score += 10;
  document.getElementById("scoreval").textContent = score;
  if (score > hiscoreval) {
    hiscoreval = score;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    document.getElementById(
      "hscore"
    ).innerHTML = `<h2>High score:${hiscoreval}</h2>`;
  }
}
function hitbtn() {
  hitrn = Math.floor(Math.random() * 10);
  document.querySelector("#hitval").textContent = hitrn;
}

function makebubble() {
  var clutter = "";

  for (var i = 1; i <= 168; i++) {
    var rn = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${rn}</div>`;
  }
  document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer() {
  if (timerint) {
    clearInterval(timerint);
  }
  timerint = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.getElementById("timerval").textContent = timer;
      if (timer <= 10) {
        tmr.play();
        hsound2.pause();
        if (timer < 10) {
          let t = "0" + timer;
          document.getElementById("timerval").innerHTML = t;
        }
      }
    } else {
      clearInterval(timerint);
      document.getElementById("pbtm").style.display = "none";
      hsound2.pause();
      tmr.pause();
      if (score > hiscore) {
        lvl.play();
        document.getElementById("game2").innerHTML = `<h1>Time Up!!</h1>`;
        document.getElementById(
          "game3"
        ).innerHTML = `<h1>Congrats!! you have high score</h1>`;
        document.getElementById("game3").style.width = "1050px";
        document.getElementById("game3").style.color = "goldenrod";
        document.getElementById("crk").style.display = "block";
      } else {
        over.play();

        document.getElementById("game2").innerHTML = `<h1>Time up!!</h1>`;
        document.getElementById(
          "game3"
        ).innerHTML = `<h1>Better luck next time </h1>`;
      }
    }
  }, 1000);
}
function handleClick(det) {
  var clicked = det.target.textContent;
  if (clicked == hitrn) {
    smash.play();
    increaseScore();
    makebubble();
    hitbtn();
  }
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  document.getElementById(
    "hscore"
  ).innerHTML = `<h2>High score:${hiscoreval}</h2>`;
}
