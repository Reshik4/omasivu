document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const userInputs = document.getElementById("userInputs");
    const confirmPlayers = document.getElementById("confirmPlayers");
    const playersDiv = document.getElementById("players");
    const throwButton = document.createElement("button");
    throwButton.innerText = "Heitä";
    throwButton.id = "throwButton";
    throwButton.style.display = "none"; // Piilotetaan aluksi
    document.body.appendChild(throwButton); // Lisätään sivulle
    const endTurnButton = document.createElement("button"); // Lisätään "Päätä vuoro" -nappi
    endTurnButton.innerText = "Päätä vuoro";
    endTurnButton.id = "endTurnButton";
    endTurnButton.style.display = "none"; // Piilotetaan aluksi
    document.body.appendChild(endTurnButton); // Lisätään sivulle

    let playerCount = 0;
    let currentPlayer = 0;
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
            endTurnButton.style.display = "block"; // Näytetään "Päätä vuoro" -nappi pelaajien lisäämisen jälkeen
            currentPlayer = 0; // Asetetaan ensimmäinen pelaaja vuoroon
            updatePlayerTurn(); // Päivitetään vuoron näyttö
        } else {
            alert("Virheellinen pelaajamäärä. Anna luku väliltä 1-4.");
        }
    });

    function createPlayerInputs(count) {
        playersDiv.innerHTML = "";
        playerScores = Array(count).fill(0); // Alustetaan pelaajien pisteet
        for (let i = 0; i < count; i++) {
            const playerName = prompt("Anna pelaajan " + (i + 1) + " nimi:");
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            playerDiv.innerHTML = "<p>" + playerName + " (pisteet: 0)</p><img />";
            playersDiv.appendChild(playerDiv);
        }
    }

    throwButton.addEventListener("click", function() {
        const currentPlayerScore = playerScores[currentPlayer];
        const diceValue = Math.floor(Math.random() * 6) + 1;
        const currentPlayerDiv = playersDiv.children[currentPlayer];
        const playerImage = currentPlayerDiv.querySelector("img");
        const playerScoreText = currentPlayerDiv.querySelector("p");
        playerImage.src = "assets/dice" + diceValue + ".png";
        if (diceValue === 1) {
            playerScores[currentPlayer] = 0;
            currentPlayer = (currentPlayer + 1) % playerCount;
        } else {
            playerScores[currentPlayer] += diceValue;
        }
        playerScoreText.textContent = currentPlayerDiv.querySelector("p").textContent.split(" (")[0] + " (pisteet: " + playerScores[currentPlayer] + ")";
        checkForWinner(); // Tarkistetaan voittaja jokaisen heiton jälkeen
        updatePlayerTurn(); // Päivitetään vuoro
    });

    endTurnButton.addEventListener("click", function() {
        currentPlayer = (currentPlayer + 1) % playerCount; // Siirrytään seuraavalle pelaajalle
        updatePlayerTurn(); // Päivitetään vuoro
    });

    function updatePlayerTurn() {
        const playerDivs = document.querySelectorAll(".player");
        playerDivs.forEach((div, index) => {
            div.style.backgroundColor = index === currentPlayer ? "yellow" : "initial"; // Korostetaan vuorossa oleva pelaaja
        });
    }

    function checkForWinner() {
        const currentPlayerScore = playerScores[currentPlayer];
        if (currentPlayerScore >= 100) {
            alert("Pelaaja " + (currentPlayer + 1) + " voitti pelin!");
            resetGame(); // Nollataan peli voittajan selvittyä
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
// Funktio päivittää heitä ja päätä vuoro napin sijainnin sen pelaajan mukaan, jonka vuoro on
function updateButtonPosition() {
    // Haetaan nykyisen pelaajan div-elementti
    const currentPlayerDiv = playersDiv.children[currentPlayer];
    // Haetaan heitä-nappi ja päätä vuoro nappi
    const throwButton = currentPlayerDiv.querySelector(".throwButton");
    const endTurnButton = currentPlayerDiv.querySelector(".endTurnButton");
    
    // Asetetaan napit nykyisen pelaajan div-elementin sisälle
    currentPlayerDiv.appendChild(throwButton);
    currentPlayerDiv.appendChild(endTurnButton);
}

// Lisätään klikkaustapahtuma heitä-napille
throwButton.addEventListener("click", function() {
    // Kutsutaan funktiota napin sijainnin päivittämiseksi
    updateButtonPosition();
    // Muut toiminnallisuudet tässä...
});

// Lisätään klikkaustapahtuma päätä vuoro napille
endTurnButton.addEventListener("click", function() {
    // Kutsutaan funktiota napin sijainnin päivittämiseksi
    updateButtonPosition();
    // Muut toiminnallisuudet tässä...
});