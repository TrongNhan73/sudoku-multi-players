document.addEventListener("DOMContentLoaded", function () {
  //define
  const hanldeLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      if (isLogin()) {
        showLoading();
        const result = await firebaseLogout();
        if (result) {
          hideLoading();
          showToast("Logout successful", "success");
          window.location.href = preLocation + "/index.html";
        } else {
          hideLoading();
          showToast("Logout failed", "error");
        }
      } else {
        showToast("You are not logged in", "error");
      }
    }
  };

  const handleCreateRoom = async () => {
    const username = document.getElementById("ipUserName").value.trim();
    const roomeId = document.getElementById("ipIdRoom").value.trim();
    if (username === "" || roomeId === "") {
      showToast("Username and Room ID cannot be empty", "error");
      return;
    } else {
      const resultBoard = createEmptyGrid();
      fillGrid(resultBoard);
      // const currentBoard = removeCells(resultBoard, 1);
      const currentBoard = removeCells(resultBoard, 40);
      const preRoom = await fbGetRoomData(roomeId);
      if (preRoom) {
        showLoading();
        const roomData = preRoom;
        if (Object.keys(roomData.players).length >= 2) {
          hideLoading();
          showToast("Room is full, please choose another room ID", "error");
          return;
        }
        roomData.players[auth.currentUser.uid] = {
          name: username,
          score: 0,
        };
        roomData.status = "playing";
        fbUpdateRoom(roomeId, roomData).then((result) => {
          hideLoading();
          if (result) {
            showToast("Joined room successfully", "success");
            window.location.href =
              preLocation + `/playground.html?roomId=${roomeId}`;
          } else {
            showToast("Failed to join room", "error");
          }
        });
      } else {
        showLoading();
        const roomData = {
          players: {
            [auth.currentUser.uid]: {
              name: username,
              score: 0,
            },
          },
          board: {
            currentBoard: boardToObject(currentBoard),
            resultBoard: boardToObject(resultBoard),
          },
          status: "waiting",
        };
        const result = await fbCreateRoom(roomeId, roomData);
        if (result) {
          hideLoading();
          showToast("Room created successfully", "success");
          window.location.href =
            preLocation + `/playground.html?roomId=${roomeId}`;
        } else {
          hideLoading();
          showToast("Failed to create room", "error");
        }
      }
    }
  };

  //add event listener
  document.querySelector(".btn-logout").addEventListener("click", hanldeLogout);
  document.querySelector(".join").addEventListener("click", handleCreateRoom);
});
