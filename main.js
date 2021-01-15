const cardBoard = document.querySelector("#cardboard");
const images = [
    'ayanokoji.jpg',
    'goku.jpg',
    'ishigami.jpg',
    'kazuma.jpg',
    'kira.jpg',
    'meliodas.jpg',
    'midoriya.png',
    'naruto.jpg'
];

let cardHTML = '';

images.forEach(img => {
    cardHTML += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="anime_images/${img}">
            <img class="back-face" src="anime_images/akatsuki.jpg">
        </div>
    `;
});



cardBoard.innerHTML = cardHTML + cardHTML;

//render html

const cards = document.querySelectorAll('.memory-card');

let firstCard, secondCard;
let lockCards = false; 

function flipCard() {
    if(lockCards) return false;

    this.classList.add('flip');
    if(!firstCard) {
      firstCard = this;
      return false;
    }

    secondCard = this;

    checkFotMatch();
    
};

function checkFotMatch() {
    let isMatch = firstCard.dataset.card ===  secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch);
};

function disableCards() {
    lockCards = true;
    
    setTimeout( () => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetCards();
    }, 1000);

};


function resetCards(isMatch = false) {
    if(isMatch) {
        firstCard.removeEventListener('click', flipCard)
    }
    [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));


const btn = document.querySelector('#btn');
btn.addEventListener('click', restartCards);


function shuffle() {
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 16);
        card.style.order = rand;
    })
};

function restartCards() {
    cards.forEach(card => card.addEventListener('click', flipCard));

    [firstCard, secondCard, lockCards] = [null, null, false];

    let cardsFlip = document.querySelectorAll('.flip');
    console.log(cardsFlip);
    cardsFlip.forEach(cardFlip => {
        cardFlip.classList.remove("flip");
    })

    shuffle();
};
