import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDiTFlxjnOmnBSkHwUEvwfkJy889eoSHLo",
    authDomain: "catch-of-the-day-mia-wong.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-mia-wong.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());


// this is a named export 
export { firebaseApp };


// this is a default export 
export default base; 