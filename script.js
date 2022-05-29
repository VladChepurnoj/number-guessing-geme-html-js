const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition
recognition.start();

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span className="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  if (num > 10 || num < 1) {
    msgEl.innerHTML += `
    <div>Number must be between 1 and 100</div>
    `;
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number! <br />
    It was ${num}

    </h2>

    <button className="play-again" id="play-again">Play again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go lower</div>`;
  } else if (num < randomNum) {
    msgEl.innerHTML += `<div>Go higher</div>`;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", () => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
