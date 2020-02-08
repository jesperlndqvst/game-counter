const submitBtnEls = document.querySelectorAll('.btn');

const updateScore = () => {
    const player = event.target.closest('div');
    const playerInputEl = player.querySelector('input');
    let playerInput = player.querySelector('input').value;
    const playerScoreEl = player.querySelector('span');
    let playerScore = parseInt(player.querySelector('span').textContent);
    const modifier = playerInput[0];
    const numbers = parseInt(playerInput.slice(1));
    let result;
    
    switch (modifier) {
        case "+":
            result = playerScore + numbers;
            break;
        case "-":
            result = playerScore - numbers;
            break;
        case "*":
            result = playerScore * numbers;
            break;
        case "/":
            result = playerScore / numbers;
            break;
        default:
            console.log('Choose a modifier');
            break;
    }
    playerScoreEl.textContent = result;
    playerInputEl.value = "";
} 


submitBtnEls.forEach(btn => {
    btn.addEventListener('click', updateScore);
});

