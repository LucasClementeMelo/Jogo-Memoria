const emojis = [
    "😁", "😁", "😒", "😒", "😎", "😎",
    "😶‍🌫️", "😶‍🌫️", "😱", "😱", "🎆", "🎆",
    "🍻", "🍻", "🚀", "🚀"
];
let openCards = [];
let matchedCards = 0;
let startTime = Date.now();
let timerId;

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = openCards;

    if (firstCard.innerHTML === secondCard.innerHTML) {
        matchedCards += 2;
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
    } else {
        firstCard.classList.remove("boxOpen");
        secondCard.classList.remove("boxOpen");
    }

    openCards = [];

    if (matchedCards === emojis.length) {
        clearInterval(timerId);
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        alert(`Parabéns! Você terminou o jogo em ${timeTaken} segundos.`);
    }
}

function startTimer() {
    const timeElement = document.getElementById("time");

    timerId = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeElement.textContent = elapsedTime;
    }, 1000);
}

window.addEventListener("DOMContentLoaded", startTimer);
