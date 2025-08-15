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
  if (user) {
    console.log("Đã đăng nhập lại:", user.displayName);
    if (location.pathname === "/index.html" || location.pathname === "/") {
      location.href = "room.html";
    }
  } else {
    console.log("Chưa đăng nhập");
    if (location.pathname !== "/") {
      location.href = "/";
    }
  }
});
