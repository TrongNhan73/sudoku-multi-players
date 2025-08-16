addEventListener("DOMContentLoaded", () => {
  const showHidePassword = () => {
    const passwordInput = document.getElementById("ipPassword");
    const showHideIcon = document.getElementById("img-show-hide-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showHideIcon.src = "images/icons/eye-open.svg";
    } else {
      passwordInput.type = "password";
      showHideIcon.src = "images/icons/eye-close.svg";
    }
  };

  //registration button click event
  document.getElementById("btnRegister").addEventListener("click", async () => {
    const email = document.getElementById("ipEmail").value.trim();
    const password = document.getElementById("ipPassword").value.trim();

    // Hide all error messages
    const messageErrors = document.querySelectorAll(".message-error");
    messageErrors.forEach((message) => {
      message.style.display = "none";
    });
    // Validate email and password
    if (!email || !password) {
      showToast("Email and password cannot be empty", "error");
      if (!email) {
        const messsage = document.getElementById("ipEmail").nextElementSibling;
        messsage.textContent = "Email cannot be empty";
        messsage.style.display = "block";
        return;
      }
      if (!password) {
        console.log("object");

        const messsage =
          document.getElementById("ipPassword").nextElementSibling
            .nextElementSibling;
        messsage.textContent = "Password cannot be empty";
        messsage.style.display = "block";
        return;
      }
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters long", "error");

      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Invalid email format", "error");

      return;
    }
    // Call Firebase registration function
    showLoading();
    const result = await firebaseRegisterWithEmailPassword(email, password);
    if (result) {
      showToast("Registration successful", "success");
      document.getElementById("ipEmail").value = "";
      document.getElementById("ipPassword").value = "";
      hideLoading();
      location.href = preLocation+"/room.html";
    } else {
      showToast("Registration failed", "error");
      hideLoading();
    }
  });

  //login button click event
  document.getElementById("btnLogin").addEventListener("click", async () => {
    const email = document.getElementById("ipEmail").value.trim();
    const password = document.getElementById("ipPassword").value.trim();
    // Hide all error messages
    const messageErrors = document.querySelectorAll(".message-error");
    messageErrors.forEach((message) => {
      message.style.display = "none";
    });
    // Validate email and password
    if (!email || !password) {
      showToast("Email and password cannot be empty", "error");
      if (!email) {
        const messsage = document.getElementById("ipEmail").nextElementSibling;
        messsage.textContent = "Email cannot be empty";
        messsage.style.display = "block";
      }
      if (!password) {
        const messsage =
          document.getElementById("ipPassword").nextElementSibling
            .nextElementSibling;
        messsage.textContent = "Password cannot be empty";
        messsage.style.display = "block";
      }
      return;
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters long", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Invalid email format", "error");
      return;
    }
    // Call Firebase login function
    showLoading();
    const result = await firebaseLoginWithEmailPassword(email, password);
    if (result) {
      showToast("Login successful", "success");
      document.getElementById("ipEmail").value = "";
      document.getElementById("ipPassword").value = "";
      hideLoading();
      location.href = preLocation+"/room.html";
    } else {
      showToast("Login failed", "error");
      hideLoading();
    }
  });

  // Google login button click event
  document.querySelector(".google").addEventListener("click", async () => {
    showLoading();
    const result = await firebaseLoginWithGoogle();
    if (result) {
      showToast("Google login successful", "success");
      hideLoading();
      location.href = preLocation+"/room.html";
    } else {
      showToast("Google login failed", "error");
      hideLoading();
    }
  });

  // Show/Hide password functionality
  document
    .getElementById("img-show-hide-password")
    .addEventListener("click", showHidePassword);
});
