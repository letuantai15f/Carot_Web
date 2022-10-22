const jwt = require("jsonwebtoken");
const firebase = require("firebase/app");
const { User } = require("../models/model");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
} = require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyDv8NgmBvo2SBI9FUZ6JPsBA0pl2ZDoI68",
  authDomain: "carot-6a8cb.firebaseapp.com",
  projectId: "carot-6a8cb",
  storageBucket: "carot-6a8cb.appspot.com",
  messagingSenderId: "364166710182",
  appId: "1:364166710182:web:9fab2ac3dbc7a60f6a0567",
  measurementId: "G-B41LMBM2CR",
};
firebase.initializeApp(firebaseConfig);
const auth = getAuth();
var userData = auth.currentUser;

exports.addUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, {
    displayName: "User",
  });
  await sendEmailVerification(result.user);
};
exports.authenticate = async (email, password, req, res) => {
  const userEmail = await User.findOne({ "account.email": email });
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user.emailVerified) {
      var token = jwt.sign(
        { id: userEmail._id, username: userEmail.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });
      res.redirect("/message");
    } else {
      var status = "alert alert-danger";
      var notify = "Vui lòng xác minh email";
      var dataStatus = { status, notify };
      return res.render("login", { message: dataStatus });
    }
  } catch (error) {
    var status = "alert alert-danger";
    var notify = "Email hoặc mật khẩu không đúng. vui lòng kiểm tra lại";
    var dataStatus = { status, notify };
    return res.render("login", { message: dataStatus });
  }
};