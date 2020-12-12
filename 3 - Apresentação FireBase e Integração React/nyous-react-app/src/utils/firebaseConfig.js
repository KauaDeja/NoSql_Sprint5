import firebase from 'firebase';

// Config do firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAKC7WwacCL0Lu6xYrBCSKFlBga8feOsqc",
    authDomain: "nyous-375ad.firebaseapp.com",
    projectId: "nyous-375ad",
    storageBucket: "nyous-375ad.appspot.com",
    messagingSenderId: "34403581334",
    appId: "1:34403581334:web:e3db0f594e7d54a206f1b7"
  };

  // iniciar Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebaseConfig;