//your JS code here. If required.
 const submitBtn = document.getElementById('submit');
  const player1Input = document.getElementById('player-1');
  const player2Input = document.getElementById('player-2');
  const boardDiv = document.getElementById('board');
  const setupDiv = document.getElementById('setup');
  const messageDiv = document.querySelector('.message');
  const cells = document.querySelectorAll('.cell');

  let player1 = "";
  let player2 = "";
  let currentPlayer = "";
  let currentSymbol = "X";
  let gameActive = true;
  let boardState = Array(9).fill("");

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  function checkWinner() {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        gameActive = false;
        const winnerName = currentSymbol === "X" ? player1 : player2;
        messageDiv.textContent = `${winnerName}, congratulations you won!`;
        return true;
      }
    }

    if (!boardState.includes("")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return true;
    }

    return false;
  }

  function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.id) - 1;

    if (!gameActive || boardState[index] !== "") return;

    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (!checkWinner()) {
      // Switch turn
      if (currentSymbol === "X") {
        currentSymbol = "O";
        currentPlayer = player2;
      } else {
        currentSymbol = "X";
        currentPlayer = player1;
      }
      messageDiv.textContent = `${currentPlayer}, you're up`;
    }
  }

  submitBtn.addEventListener('click', () => {
    player1 = player1Input.value.trim() || "Player 1";
    player2 = player2Input.value.trim() || "Player 2";

    currentPlayer = player1;
    currentSymbol = "X";
    boardState = Array(9).fill("");
    gameActive = true;

    // Reset UI
    cells.forEach(cell => {
      cell.textContent = "";
    });

    messageDiv.textContent = `${currentPlayer}, you're up`;
    setupDiv.style.display = "none";
    boardDiv.style.display = "block";
  });

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
