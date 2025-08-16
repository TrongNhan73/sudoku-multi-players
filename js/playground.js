const roomId = new URLSearchParams(window.location.search).get("roomId");
let currCell = null;
let globalDataRoom = null;

let resultBoard = null;
let puzzleBoard = null;

// const puzzleBoard = removeCells(resultBoard, 40);

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------
  // ----------------------define-----------
  // ---------------------------------------
  const handleClickCell = (e) => {
    currCell = e.currentTarget.id.split("-");
    if (e.currentTarget.innerText === "") {
      document.querySelectorAll("#sudoku-board td").forEach((cell) => {
        cell.classList.remove("highlighted");
        cell.classList.remove("selected");
      });
      e.currentTarget.classList.add("selected");
      document.getElementById("controls").style.visibility = "visible";
    } else {
      document.getElementById("controls").style.visibility = "hidden";

      document.querySelectorAll("#sudoku-board td").forEach((cell) => {
        if (cell.innerText === e.currentTarget.innerText) {
          cell.classList.toggle("highlighted");
        } else {
          cell.classList.remove("highlighted");
        }
      });
    }
  };

  const handleSelectNumber = async (e) => {
    const selectedNumber = Number(e.currentTarget.innerText);
    if (selectedNumber === resultBoard[currCell[0] - 1][currCell[1] - 1]) {
      if (Number(puzzleBoard[currCell[0] - 1][currCell[1] - 1]) !== 0) {
        showToast("This cell is already filled!", "error");
        return;
      }
      generrateCell(selectedNumber, currCell[0] - 1, currCell[1] - 1);
      puzzleBoard[currCell[0] - 1][currCell[1] - 1] = selectedNumber;
      globalDataRoom.players[auth.currentUser.uid].score += 1;
      globalDataRoom.board.currentBoard = boardToObject(puzzleBoard);
      const result = await fbUpdateRoom(roomId, globalDataRoom);
      if (result) {
        document.getElementById("controls").style.visibility = "hidden";
      }
    } else {
      showToast("Wrong number!", "error");
      globalDataRoom.players[auth.currentUser.uid].score -= 1;
      const result = await fbUpdateRoom(roomId, globalDataRoom);
    }
  };

  const handleListener = (dataRoom) => {
    if (!dataRoom) {
      alert("Room not found or has been deleted!");
      window.location.href = preLocation + "/index.html";
      return;
    }
    console.log("Data Room:", dataRoom);
    const loadingContainer = document.querySelector(".container-loading");
    if (dataRoom.status === "playing") {
      globalDataRoom = dataRoom;
      loadingContainer.style.display = "none";
      puzzleBoard = objectToBoard(dataRoom.board.currentBoard);
      resultBoard = objectToBoard(dataRoom.board.resultBoard);
      generateBoard();
      // Update player names and scores
      const player1 = document.getElementById("players-score").children[0];
      const player2 = document.getElementById("players-score").children[1];
      if (player1.id === "") {
        player1.id = Object.keys(globalDataRoom.players)[0];
        player2.id = Object.keys(globalDataRoom.players)[1];
      }
      player1.querySelector("#player-name").textContent =
        globalDataRoom.players[player1.id].name;
      player1.querySelector("#player-score").textContent =
        globalDataRoom.players[player1.id].score;
      player2.querySelector("#player-name").textContent =
        globalDataRoom.players[player2.id].name;
      player2.querySelector("#player-score").textContent =
        globalDataRoom.players[player2.id].score;

      //check if the game is complete
      if (isCompleteBoard(puzzleBoard)) {
        globalDataRoom.status = "finished";
        fbUpdateRoom(roomId, globalDataRoom);
      }
      return;
    }
    if (dataRoom.status === "waiting") {
      loadingContainer.style.display = "flex";
      return;
    }
    if (dataRoom.status === "finished") {
      console.log("Game Over");
      globalDataRoom = dataRoom;
      const winner = Object.keys(globalDataRoom.players).reduce((a, b) =>
        globalDataRoom.players[a].score > globalDataRoom.players[b].score
          ? a
          : b
      );
      loadingContainer.style.display = "none";
      alert(`Game Over! Winner: ${globalDataRoom.players[winner].name}`);
      document.querySelectorAll("#sudoku-board td").forEach((cell) => {
        cell.classList.remove("selected");
        cell.classList.remove("highlighted");
      });
      document.getElementById("controls").style.display = "none";
      db.ref(`rooms/${roomId}`).off();
      fbDeleteRoom(roomId);
      window.location.href = preLocation + "/room.html";
    }
  };

  // ---------------------------------------
  // --------generate-----------------------
  // ---------------------------------------
  const generrateCell = (value, row, col) => {
    const cell = document.getElementById("" + (row + 1) + "-" + (col + 1));
    cell.textContent = value === 0 ? "" : value;
  };

  const generateBoard = () => {
    const board = document.getElementById("sudoku-board");
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        generrateCell(puzzleBoard[row][col], row, col);
      }
    }
  };

  // ---------------------------------------
  // --------listener-----------------------
  // ---------------------------------------
  document.querySelectorAll("#sudoku-board td").forEach((cell) => {
    cell.addEventListener("click", handleClickCell);
  });
  document.querySelectorAll("#controls .number").forEach((number) => {
    number.addEventListener("click", handleSelectNumber);
  });

  if (roomId) {
    fbListenToRoomChanges(roomId, handleListener);
  } else {
    alert("Room ID is missing!");
    window.location.href = preLocation + "/index.html";
  }
});
