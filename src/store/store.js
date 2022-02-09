import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    // arrow function recommended for full type inference
    state: () => ({
        feedbackList: [
            {
                id: 0,
                name: "Kevin",
                title: "Question to the teacher",
                category: "Teacher",
                description:
                    "Why are all teachers in this school alway very severe with students?",
                upvote: 6,
                commentList: [],
            },
            {
                id: 1,
                name: "Myriam",
                title: "Maths class today",
                category: "Student",
                description:
                    "I just never understood a bit of what the teacher was saying today",
                upvote: 10,
                commentList: [
                    {
                        id: 1,
                        name: "Toni",
                        description: " Me too you",
                    },
                    {
                        id: 2,
                        name: "Dori",
                        description: "Yep same here",
                    },
                    {
                        id: 3,
                        name: "Sam",
                        description: " I agree with you",
                    },
                ],
            },
            {
                id: 2,
                name: "Mimi",
                title: "This is for everyone",
                category: "Everyone",
                description: "Everyone in this place doesn't care so what should I do?",
                upvote: 4,
                commentList: [
                    {
                        id: 1,
                        name: "Kevin",
                        description: " I agree with you",
                    },
                ],
            },
            {
                id: 3,
                name: "Ornel",
                title: "Friends",
                category: "Student",
                description:
                    "Why are all teachers in this school alway very severe with us?",
                upvote: 1,
                commentList: [
                    {
                        id: 1,
                        name: "Myriam",
                        description: " I  don't agree with you",
                    },
                    {
                        id: 2,
                        name: "Toyi",
                        description: " I agree with you",
                    },
                    {
                        id: 3,
                        name: "Hide",
                        description: " I agree with you",
                    },
                    {
                        id: 4,
                        name: "Men",
                        description: " I agree with you",
                    },
                    {
                        id: 5,
                        name: "Karen",
                        description: " seems quit right for me",
                    },
                ],
            },
        ],
        categoryList: ["Student", "Teacher", "Everyone", "Admin"],
        }),
    actions: {
        addFeedback( feedback) {
            this.feedbackList.push(feedback);
        },
        addComment( comment) {
            this.feedbackList.forEach((feedback) => {
                if (feedback.id == comment.id) {
                    let index = this.feedbackList.indexOf(feedback);
                    this.feedbackList[index].commentList.push(comment);
                    console.log(this.feedbackList[index].commentList);
                }
            });
        },
        editFeedback( editData) {
            this.feedbackList.forEach((feedback) => {
                if (feedback.id == editData.id) {
                    let index = this.feedbackList.indexOf(feedback);
                    this.feedbackList[index].title = editData.title;
                    this.feedbackList[index].category = editData.category;
                    this.feedbackList[index].description = editData.description;
                }
            });
        },
        deleteFeedback( id) {
            this.feedbackList.forEach((feedback) => {
                if (feedback.id == id) {
                    let index = this.feedbackList.indexOf(feedback);
                    this.feedbackList.splice(index, 1);
                }
            });
        },
        incrementUpvote( id) {
            this.feedbackList.forEach((feedback) => {
                if (feedback.id == id) {
                    let index = this.feedbackList.indexOf(feedback);
                    this.feedbackList[index].upvote++;
                }
            });
        },
        decrementUpvote( id) {
            this.feedbackList.forEach((feedback) => {
                if (feedback.id == id) {
                    let index = this.feedbackList.indexOf(feedback);
                    this.feedbackList[index].upvote--;
                }
            });
        },
    }
})