/*
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import firebase from '../firebase/init'
const db = firebase.firestore();

const feedbackList = () => {
    let list = [];
    db.collection('feedback')
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                list.push({
                    DocId: doc.id,
                    id: doc.data().id,
                    category: doc.data().category,
                    description: doc.data().description,
                    name: doc.data().name,
                    title: doc.data().title,
                    upvote: doc.data().upvote,
                    commentList: doc.data().commentList
                });
            });
        return list;
    }).catch((error) => {
        console.log(error);
    })
}

export default feedbackList;

 */