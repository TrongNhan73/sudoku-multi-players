const showToast = (message, type) => {
  const toastContainer = document.createElement("div");
  toastContainer.className = "toastify-container";
  const toastContent = document.createElement("div");
  toastContent.className = "toastify-content";

  const toastIcon = document.createElement("div");
  toastIcon.className = "toastify-icon";
  const iconImage = document.createElement("img");
  iconImage.src =
    type === "success" ? "images/icons/success.svg" : "images/icons/failed.svg";
  iconImage.alt = "";
  toastIcon.appendChild(iconImage);

  const toastMessage = document.createElement("div");
  toastMessage.className = "toastify-message";
  toastMessage.textContent = message;

  toastContent.appendChild(toastIcon);
  toastContent.appendChild(toastMessage);

  toastContainer.appendChild(toastContent);
  document.body.appendChild(toastContainer);

  setTimeout(() => {
    document.body.removeChild(toastContainer);
  }, 3000);
};
