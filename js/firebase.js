const firebaseConfig = {
  apiKey: "AIzaSyCHhJteiQXzzqdUeUVu48R0rut3lDDY-hE",
  authDomain: "sudoku-multi-players.firebaseapp.com",
  databaseURL: "https://sudoku-multi-players-default-rtdb.firebaseio.com",
  projectId: "sudoku-multi-players",
  storageBucket: "sudoku-multi-players.firebasestorage.app",
  messagingSenderId: "501045514035",
  appId: "1:501045514035:web:309e58058ac09cf4e87846",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

