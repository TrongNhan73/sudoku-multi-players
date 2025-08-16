// const preLocation = "http://localhost:8080";
const preLocation = "https://trongnhan73.github.io/sudoku-multi-players";
const firebaseRegisterWithEmailPassword = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
};
const firebaseLoginWithEmailPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

const firebaseLoginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    return true;
  } catch (error) {
    console.error("Google login failed:", error);
    return false;
  }
};

const firebaseLogout = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

const isLogin = () => {
  return auth.currentUser !== null;
};

auth.onAuthStateChanged((user) => {
  console.log(
    location.href === preLocation + "/index.html" ||
      location.pathname === preLocation + "/" ||
      location.pathname === preLocation
  );
  if (user) {
    console.log("Đã đăng nhập lại:", user.displayName);
    if (
      location.href === preLocation + "/index.html" ||
      location.href === preLocation + "/" ||
      location.href === preLocation
    ) {
      location.href = preLocation + "/room.html";
    }
  } else {
    console.log("Chưa đăng nhập");
    if (location.href !== preLocation + "/") {
      location.href = preLocation + "/";
    }
  }
});
