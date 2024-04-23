document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const userInputs = document.getElementById("userInputs");
    const confirmPlayers = document.getElementById("confirmPlayers");
    const playersDiv = document.getElementById("players");
    const throwButton = document.createElement("button");
    throwButton.innerText = "Heitä";
    throwButton.id = "throwButton";
    throwButton.style.display = "none";
    document.body.appendChild(throwButton);
    const endTurnButton = document.createElement("button");
    endTurnButton.innerText = "Päätä vuoro";
    endTurnButton.id = "endTurnButton";
    endTurnButton.style.display = "none";
    document.body.appendChild(endTurnButton);

    let playerCount = 0;
    let currentPlayer = 0;
    let roundScore = 0;
    let playerScores = [];

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        userInputs.style.display = "block";
    });

    confirmPlayers.addEventListener("click", function() {
        playerCount = parseInt(document.getElementById("playerCount").value);
        if (playerCount > 0 && playerCount <= 4) {
            createPlayerInputs(playerCount);
            userInputs.style.display = "none";
            playersDiv.style.display = "block";
            throwButton.style.display = "block";
            endTurnButton.style.display = "block";
            currentPlayer = 0;
            updatePlayerTurn();
        } else {
            alert("Virheellinen pelaajamäärä. Anna luku väliltä 1-4.");
        }
    });

    function createPlayerInputs(count) {
        playersDiv.innerHTML = "";
        playerScores = Array(count).fill(0);
        for (let i = 0; i < count; i++) {
            const playerName = prompt("Anna pelaajan " + (i + 1) + " nimi:");
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            playerDiv.innerHTML = `<p>${playerName} (Kokonaispisteet: 0, kierroksen pisteet: 0)</p><img class='dice1' src='' alt='Dice 1'><img class='dice2' src='' alt='Dice 2'>`;
            playersDiv.appendChild(playerDiv);
        }
    }

    throwButton.addEventListener("click", function() {
        let diceValues = [1, 2].map(() => Math.floor(Math.random() * 6) + 1);
        const currentPlayerDiv = playersDiv.children[currentPlayer];
        currentPlayerDiv.querySelector(".dice1").src = `assets/dice${diceValues[0]}.png`;
        currentPlayerDiv.querySelector(".dice2").src = `assets/dice${diceValues[1]}.png`;

        if (diceValues[0] === 1 || diceValues[1] === 1) {
            roundScore = 0; // Nollaa kierroksen pisteet
            updateCurrentPlayerScoreDisplay();
            nextPlayer(); // Siirrä vuoro seuraavalle pelaajalle
        } else {
            roundScore += diceValues.reduce((a, b) => a + b);
            updateCurrentPlayerScoreDisplay();
            checkForWin();
        }
    });

    endTurnButton.addEventListener("click", function() {
        playerScores[currentPlayer] += roundScore;
        roundScore = 0;
        updateCurrentPlayerScoreDisplay(true);
        nextPlayer();
    });

    function updateCurrentPlayerScoreDisplay(endTurn = false) {
        const playerScoreText = playersDiv.children[currentPlayer].querySelector("p");
        playerScoreText.textContent = `${playerScoreText.textContent.split(" (")[0]} (Kokonaispisteet: ${playerScores[currentPlayer]}, kierroksen pisteet: ${endTurn ? 0 : roundScore})`;
    }

    function nextPlayer() {
        currentPlayer = (currentPlayer + 1) % playerCount;
        roundScore = 0;  // Varmista, että kierroksen pisteet nollataan
        updatePlayerTurn();
    }

    function updatePlayerTurn() {
        const playerDivs = document.querySelectorAll(".player");
        playerDivs.forEach((div, index) => {
            div.style.backgroundColor = index === currentPlayer ? "yellow" : "initial";
        });
    }

    function checkForWin() {
        if (playerScores[currentPlayer] >= 100) {
            alert(`Pelaaja ${playersDiv.children[currentPlayer].querySelector("p").textContent.split(" (")[0]} voitti pelin!`);
            resetGame();
        }
    }

    function resetGame() {
        playerCount = 0;
        currentPlayer = 0;
        roundScore = 0;
        playerScores = [];
        startButton.style.display = "block";
        userInputs.style.display = "none";
        playersDiv.style.display = "none";
        throwButton.style.display = "none";
        endTurnButton.style.display = "none";
        playersDiv.innerHTML = "";
    }
});
