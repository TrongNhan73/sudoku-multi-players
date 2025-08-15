// console.log(checkLogin());

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
          window.location.href = "index.html";
        } else {
          hideLoading();
          showToast("Logout failed", "error");
        }
      } else {
        showToast("You are not logged in", "error");
      }
    }
  };

  const handleCreateRoom = () => {
    const username = document.getElementById("ipUserName").value.trim();
    const roomeId = document.getElementById("ipIdRoom").value.trim();
    if (username === "" || roomeId === "") {
      showToast("Username and Room ID cannot be empty", "error");
      return;
    }
  };

  //add event listener
  document.querySelector(".btn-logout").addEventListener("click", hanldeLogout);
  document.querySelector(".join").addEventListener("click", handleCreateRoom);
});
