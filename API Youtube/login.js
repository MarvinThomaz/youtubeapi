
var config = {
    apiKey: "AIzaSyCsliPpQfamUlK-uIL_In0vnQXOuGJ1lb8",
    authDomain: "youtube-fcf29.firebaseapp.com",
    databaseURL: "https://youtube-fcf29.firebaseio.com",
    storageBucket: "youtube-fcf29.appspot.com",
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/plus.login');

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});