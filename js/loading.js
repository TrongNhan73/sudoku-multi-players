const showLoading = () => {
  const loadingElement = document.createElement("div");
  loadingElement.className = "container-loader";
  loadingElement.innerHTML = `
    <div class="loader"></div>
    <p>Loading...</p>
  `;
  document.body.appendChild(loadingElement);
};
const hideLoading = () => {
  const loadingElement = document.querySelector(".container-loader");
  if (loadingElement) {
    document.body.removeChild(loadingElement);
  }
};
