<template>
  <div class="feedback-comment-main">
    <div class="feedback-comment-header">
      <router-link to="/home" class="btn btn-return">Home</router-link>
      <div class="btn-edit">
        <button class="btn btn-edit" data-target="#editModal" data-toggle="modal">
          Edit Feedback
        </button>
      </div>
    </div>
    <div class="feedback-feedback-display">
      <FeedbackDisplay :feedback="data.feedback"></FeedbackDisplay>
    </div>
    <div class="feedback-feedback-comments" v-show="data.feedback.commentList.length">
      <div class="no-of-comments">
        <span>{{data.feedback.commentList.length}}
          Comment{{data.feedback.commentList.length == 1 ?'' : 's'}}</span>
      </div>
      <div class="feedback-comments"
           v-for="(comment, index) in data.feedback.commentList"
           v-bind:key="comment.id">
        <div class="feedback-comment-name">{{comment.name}}</div>
        <div class="feedback-comment-content">{{comment.description}}</div>
        <hr v-show="index < data.feedback.commentList.length -1 ">
      </div>
    </div>
    <div class="feedback-add-comment">
      <h5> Add Comment</h5>
      <form class="form-form">
        <div class="form-group">
          <label for="cDescription">Description</label>
          <textarea
              class="form-control"
              id="cDescription"
              rows="3"
              v-model="data.description"
          ></textarea>
        </div>
        <div class="form-validation">{{data.error.description}}</div>
        <button class="btn btn-submit" @click.prevent="saveComment">Add Comment</button>
      </form>
    </div>
    <DeleteFeedback :id="data.feedback.id"></DeleteFeedback>
    <EditFeedback :feedback="data.feedback"></EditFeedback>
  </div>
</template>

<script setup>
import FeedbackDisplay from "../components/FeedbackDisplay";
import DeleteFeedback from "../components/DeleteFeedback";
import EditFeedback from "../components/EditFeedback";
import { reactive } from "vue";
import { useRoute } from 'vue-router';
import {useStore} from "../store/store";

const route = useRoute();

const store = useStore();

const data = reactive({
  feedbackId: Number(route.params.id),
  description:'',
  comments: [],
  feedback: {},
  error: {
    name: '',
    description:'',
  },
})
/****** initializing feedback ****/

store.feedbackList.forEach((feedback) => {
  if(feedback.id === data.feedbackId) {
    data.feedback = feedback;
  }
});

function saveComment() {
  validation();
  if(data.description) {
    let comment = {
      id:data.feedback.id,
      name: localStorage.getItem('name'),
      description: data.description,
    }
    data.feedback.commentList.push(comment);
    let addData = {
      currentCommentList: data.feedback.commentList,
      docId: data.feedback.docId,
      id: data.feedbackId
    }
    store.addComment(addData);
    clear();
  }
}

function validation() {
  if(!data.description) {
    data.error.description = "Description is required";
  }
}

function clear() {
  data.name = '';
  data.description = '';
  data.error.name = '';
  data.error.description = '';
}
</script>

<style scoped>
.feedback-comment-main {
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-left: 20%;
  margin-right: 20%;
}
.feedback-comment-header {
  display: flex;
  justify-content: space-between;
}
.btn-return::before {
  content: '<';
  font-weight: bold;
  color: white;
  font-size: 20px;
  margin-right: 5px;
}
.btn-return {
  background:#3a4374;
  color: white;
  border-radius: 0.5em;
  font-weight: bold;
}
.btn-edit {
  background: #ad1fea;
  color: white;
  border-radius: 0.5em;
  font-weight: bold;
}
.no-of-comments{
  font-weight: bold;
  font-size: 20px;
  color: #3a4374;
}
.feedback-feedback-comments {
  margin-top: 2em;
  background: white;
  border-radius: 0.5em;
}
.no-of-comments {
  margin-left: 3em;
}
.feedback-add-comment {
  margin-top: 2em;
  background: white;
}

.btn, .btn:hover {
  box-shadow: none;
}
hr {
  margin-left: 2em;
  margin-right: 2em;
}
form {
  margin: 2em 2em 2em 3em;
}
.feedback-add-comment > h5 {
  margin: 1em 1em 1em 3em;
  color: #3a4374;
}
.feedback-add-comment {
  border-radius: 0.5em;
}
.btn-submit {
  background: #ad1fea;
  color: white;
}
.feedback-comments {
  margin: 1em 1em 1em 3em;
}
.feedback-comment-name {
  font-weight: bold;
  color: #3a4374;
}
.form-validation {
  color: red;
}
.form-group {
  margin-bottom: 1em;
}
.btn:hover {
  color: white;
  opacity: 0.5;
}
.btn {
  box-shadow: none;
}

@media only screen and (max-width: 520px) {
  .feedback-comment-main {
    margin-left: 2%;
    margin-right: 2%;
  }

}
@media only screen and (max-width: 1200px) {
  .feedback-comment-main {
    margin-left: 10%;
    margin-right: 10%;
  }
}
</style>