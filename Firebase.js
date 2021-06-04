import * as firebase from "firebase"

const firebaseConfig ={
        apiKey: "AIzaSyDNQN3GUX3kr4POFQ5y6ngpTPi4pwqnBWs",
        authDomain: "lebanonlivedoutdoors.firebaseapp.com",
        projectId: "lebanonlivedoutdoors",
        storageBucket: "lebanonlivedoutdoors.appspot.com",
        messagingSenderId: "44509660415",
        appId: "1:44509660415:web:d1c6dc55ea779ecf10b8ca"
};

let app;

if(firebase.apps.length === 0){
    app= firebase.initializeApp(firebaseConfig)
}else{
    app= firebase.app();
}

co