// script.js
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const userInputs = document.getElementById("userInputs");
    const confirmPlayers = document.getElementById("confirmPlayers");
    const playersDiv = document.getElementById("players");
    const throwButton = document.createElement("button");
    throwButton.innerText = "Heitä";
    throwButton.id = "throwButton";
    throwButton.style.display = "none"; // Hide initially
    document.body.appendChild(throwButton); // Append to the document
    const endTurnButton = document.createElement("button"); // Create "End Turn" button
    endTurnButton.innerText = "Päätä vuoro";
    endTurnButton.id = "endTurnButton";
    endTurnButton.style.display = "none"; // Hide initially
    document.body.appendChild(endTurnButton); // Append to the document

    let playerCount = 0;
    let currentPlayer = 0;
    let playerScores = [];

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        userInputs.style.display = "block";
    });

    confirmPlayers.addEventListener("click", function() {
        playerCount = parseInt(document.getElementById("playerCount").value);
        const diceCount = parseInt(document.getElementById("diceCount").value); // Get the number of dice
        if (playerCount > 0 && playerCount <= 4 && diceCount >= 1 && diceCount <= 2) {
            createPlayerInputs(playerCount);
            userInputs.style.display = "none";
            playersDiv.style.display = "block";
            throwButton.style.display = "block";
            endTurnButton.style.display = "block"; // Show "End Turn" button after adding players
            currentPlayer = 0; // Set the first player's turn
            updatePlayerTurn(); // Update turn display
        } else {
            alert("Virheellinen pelaajamäärä tai noppien määrä.");
        }
    });

    function createPlayerInputs(count) {
        playersDiv.innerHTML = "";
        playerScores = Array(count).fill(0); // Initialize player scores
        for (let i = 0; i < count; i++) {
            const playerName = prompt("Anna pelaajan " + (i + 1) + " nimi:");
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            playerDiv.innerHTML = "<p>" + playerName + " (pisteet: 0)</p><img class='dice1' src='' alt='Dice 1'><img class='dice2' src='' alt='Dice 2'>";
            playersDiv.appendChild(playerDiv);
        }
    }
    

    throwButton.addEventListener("click", function() {
        const currentPlayerScore = playerScores[currentPlayer];
        let diceValues = [];
        for (let i = 0; i < 2; i++) {
            diceValues.push(Math.floor(Math.random() * 6) + 1); // Roll two dice
        }
        const currentPlayerDiv = playersDiv.children[currentPlayer];
        const playerImage1 = currentPlayerDiv.querySelector(".dice1");
        const playerImage2 = currentPlayerDiv.querySelector(".dice2");
        const playerScoreText = currentPlayerDiv.querySelector("p");
    
        // Update the src and alt attributes of the dice images
        playerImage1.src = "assets/dice" + diceValues[0] + ".png";
        playerImage1.alt = "Dice " + diceValues[0];
        playerImage2.src = "assets/dice" + diceValues[1] + ".png";
        playerImage2.alt = "Dice " + diceValues[1];
    
        // Check for the conditions of Sika with two dice
        if (diceValues[0] === 1 && diceValues[1] === 1) {
            playerScores[currentPlayer] += 25; // Two ones score 25 points
        } else if (diceValues[0] === diceValues[1]) {
            playerScores[currentPlayer] += diceValues[0] * 2; // Doubles score double points
        } else if (diceValues[0] === 1 || diceValues[1] === 1) {
            playerScores[currentPlayer] = 0; // Reset score to 0 if any die is one
            currentPlayer = (currentPlayer + 1) % playerCount; // Move to the next player
        } else {
            playerScores[currentPlayer] += diceValues[0] + diceValues[1]; // Otherwise, sum the dice values
        }
    
        // Update the player score text
        playerScoreText.textContent = currentPlayerDiv.querySelector("p").textContent.split(" (")[0] + " (pisteet: " + playerScores[currentPlayer] + ")";
        checkForWinner(); // Check for a winner after each turn
        updatePlayerTurn(); // Update turn
    });

    endTurnButton.addEventListener("click", function() {
        currentPlayer = (currentPlayer + 1) % playerCount; // Move to the next player
        updatePlayerTurn(); // Update turn
    });

    function updatePlayerTurn() {
        const playerDivs = document.querySelectorAll(".player");
        playerDivs.forEach((div, index) => {
            div.style.backgroundColor = index === currentPlayer ? "yellow" : "initial"; // Highlight the current player
        });
    }

    function checkForWinner() {
        const currentPlayerScore = playerScores[currentPlayer];
        if (currentPlayerScore >= 100) {
            alert("Pelaaja " + (currentPlayer + 1) + " voitti pelin!");
            resetGame(); // Reset the game after a player wins
        }
    }

    function resetGame() {
        playerCount = 0;
        currentPlayer = 0;
        playerScores = [];
        startButton.style.display = "block";
        userInputs.style.display = "none";
        playersDiv.style.display = "none";
        throwButton.style.display = "none";
        endTurnButton.style.display = "none";
        playersDiv.innerHTML = "";
    }
});
