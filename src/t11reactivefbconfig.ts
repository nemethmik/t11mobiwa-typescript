
import * as firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"

// <script src="https://www.gstatic.com/firebasejs/5.7.2/firebase.js"></script>
// <script>
  // Initialize Firebase
const config = {
  apiKey: "AIzaSyBRX2NTtomRdeyIMQvO5CTOM0oxeZJce00",
  authDomain: "tiva11reactive.firebaseapp.com",
  databaseURL: "https://tiva11reactive.firebaseio.com",
  projectId: "tiva11reactive",
  storageBucket: "tiva11reactive.appspot.com",
  messagingSenderId: "295633411404"
}
firebase.initializeApp(config);
// </script>
firebase.firestore().settings({timestampsInSnapshots:true})
export default firebase //This is a special case where export default is OK
