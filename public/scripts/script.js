const btnEls = document.querySelectorAll('.btn');

const updateScore = () => {
    const player = event.target.closest('.player');
    const playerScoreEl = player.querySelector('.player__score');
    const playerScore = parseInt(playerScoreEl.textContent);
    const modifier = event.target.dataset.key;
    let result;
    
    switch (modifier) {
        case "+1":
            result = playerScore + 1;
            break;
        case "+10":
            result = playerScore + 10;
            break;
        case "-1":
            result = playerScore - 1;
            break;
        case "-10":
            result = playerScore - 10;
            break;
        default:
            console.log('Choose a modifier');
            break;
    }
    playerScoreEl.textContent = result;
} 

btnEls.forEach(btn => {
    btn.addEventListener('click', updateScore);
});

