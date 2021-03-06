
var config = {
  apiKey: "AIzaSyCsliPpQfamUlK-uIL_In0vnQXOuGJ1lb8",
  authDomain: "youtube-fcf29.firebaseapp.com",
  databaseURL: "https://youtube-fcf29.firebaseio.com",
  storageBucket: "youtube-fcf29.appspot.com",
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login');

firebase.auth().signInWithPopup(provider).then(function (result) {
  var token = result.credential.accessToken;
  var user = result.user;

  if (user != null)
    $("[usuario]").text(user.displayName);
    
}).catch(function (error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user != null)
    $("[usuario]").text(user.displayName);
});