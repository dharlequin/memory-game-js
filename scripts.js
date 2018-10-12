const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (this === firstCard) return;
    if (lockBoard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
    }
 
    if (firstCard && secondCard) {
        checkForMatch();
    }
}

function checkForMatch() {
    console.log("First Card: " + firstCard.dataset.framework);
    console.log("Second Card: " + secondCard.dataset.framework);
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    console.log("Match found, disabling cards.")
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // firstCard.children[0].classList.remove('card-hover');
    // secondCard.classList.remove('card-hover');

    resetBoard();
}

function unflipCards() {
    console.log("Match not found, unflipping cards.")
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));