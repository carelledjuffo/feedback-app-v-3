import { defineStore } from 'pinia'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import firebase from '../firebase/init'
import moment from 'moment';


const db = firebase.firestore();


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    // arrow function recommended for full type inference
    state: () => ({
        feedbackList: [],
        categoryList: ["Student", "Teacher", "Everyone", "Admin"],
        userName: '',
        }),
    actions: {
        getAllFeedbacks() {
            db.collection('feedback').orderBy("createdAt", "desc")
                .get().then((querySnapshot) => {
                console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                    this.feedbackList.push({
                        docId: doc.id,
                        id: doc.data().id,
                        email: doc.data().email,
                        category: doc.data().category,
                        description: doc.data().description,
                        name: doc.data().name,
                        title: doc.data().title,
                        upvote: doc.data().upvote,
                        commentList: doc.data().commentList,
                        date: doc.data().date,
                        upVoters: doc.data().upVoters,
                        downVoters: doc.data().downVoters
                    });
                });
            }).catch((error) => {
                console.log(error);
            })
        },
        getFeedbackId: function() {
            return db.collection('feedback_id').get();
        },
        incrementFeedbackId(docId, feedbackId) {
            db.collection("feedback_id")
                .doc(docId)
                .update({
                    id: feedbackId + 1
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        addFeedback( feedback) {
           // this.feedbackList.push(feedback);
            db.collection("feedback")
                .add(feedback)
                .then((docRef) => {
                    console.log("Document successfully written!");
                    return docRef.get();
                })
                .then((doc) => {
                    //prepend object
                    this.feedbackList.unshift({
                        docId: doc.id,
                        id: doc.data().id,
                        email: doc.data().email,
                        category: doc.data().category,
                        description: doc.data().description,
                        name: doc.data().name,
                        title: doc.data().title,
                        upvote: doc.data().upvote,
                        commentList: doc.data().commentList,
                        date: doc.data().date,
                        upVoters: doc.data().upVoters,
                        downVoters: doc.data().downVoters
                    });
                    console.log(this.feedbackList);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        },
        addComment( {currentCommentList, docId, id }) {
            db.collection("feedback")
                .doc(docId)
                .update({
                    commentList: currentCommentList
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList = this.feedbackList.map((feedback) => {
                        if(feedback.id === id) {
                            feedback.commentList = currentCommentList;
                        }
                        return feedback;
                    })
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        editFeedback( editData) {
            db.collection("feedback")
                .doc(editData.id)
                .update({
                    title: editData.title,
                    category: editData.category,
                    description: editData.description
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === editData.id) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].title = editData.title;
                            this.feedbackList[index].category = editData.category;
                            this.feedbackList[index].description = editData.description;
                            this.this.feedbackList[index].date = moment(new Date());

                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        deleteFeedback( id) {
                db.collection("feedback")
                    .doc(id)
                    .delete()
                    .then(() => {
                        console.log("Document successfully deleted!");
                        this.feedbackList.forEach((feedback) => {
                            if(feedback.docId === id) {
                                let index = this.feedbackList.indexOf(feedback);
                                this.feedbackList.splice(index, 1);
                            }
                        })
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
                    });
        },
        incrementUpvote( id, currentUpvote) {
            db.collection("feedback")
                .doc(id)
                .update({
                    upvote: currentUpvote + 1
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === id) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].upvote += 1;
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        decrementUpvote( id, currentUpvote) {
            db.collection("feedback")
                .doc(id)
                .update({
                    upvote: currentUpvote - 1
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === id) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].upvote -= 1;
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        storeUser(user) {
            db.collection("users")
                .add(user)
                .then((docRef) => {
                    console.log("Document successfully written!");
                    return docRef.get();
                })
                .then((doc) => {
                    //prepend object
                    this.userList.push({
                        docId: doc.id,
                        email: doc.data().email,
                        name: doc.data().name,
                    });
                    console.log(this.userList);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        },
       getUserName() {
           return db.collection('users').get();
       },
        addUpVoter(docId, currentUpVoterList, currentUserEmail) {
            currentUpVoterList.push(currentUserEmail)
            db.collection("feedback")
                .doc(docId)
                .update({
                    upVoters: currentUpVoterList
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === docId) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].upVoters = currentUpVoterList;
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        addDownVoter(docId, currentDownVoterList, currentUserEmail) {
            currentDownVoterList.push(currentUserEmail)
            db.collection("feedback")
                .doc(docId)
                .update({
                    downVoters: currentDownVoterList
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === docId) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].downVoters = currentDownVoterList;
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        removeUpVoter(docId, upVoterIndex, currentUpVoterList ) {
            currentUpVoterList.splice(upVoterIndex, 1);
            db.collection("feedback")
                .doc(docId)
                .update({
                    upVoters: currentUpVoterList
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === docId) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].upVoters = currentUpVoterList;
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },
        removeDownVoter(docId, downVoterIndex, currentDownVoterList ) {
            currentDownVoterList.splice(downVoterIndex, 1);

            db.collection("feedback")
                .doc(docId)
                .update({
                    downVoters: currentDownVoterList
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    this.feedbackList.forEach((feedback) => {
                        if(feedback.docId === docId) {
                            let index = this.feedbackList.indexOf(feedback);
                            this.feedbackList[index].downVoters = currentDownVoterList;
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
    }
})