<template>
  <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <p><span class="feedback-username">{{feedback.name}}: </span> {{feedback.description}}</p>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="others-comment-list">
            <ul v-for="comment in data.comments" v-bind:key="comment.id">
              <li><span class="others-comment-name">{{comment.name}}: </span> {{data.comment.description}}</li>
            </ul>
          </div>
          <h5> Add your Comment</h5>
          <form class="form-form">
            <div class="form-group">
              <label for="cTitle">Name</label>
              <input
                  type="text"
                  class="form-control"
                  id="cTitle"
                  v-model="data.name"
              />
            </div>
            <div class="form-group">

              <label for="cDescription">Description</label>
              <textarea
                  class="form-control"
                  id="cDescription"
                  rows="3"
                  v-model="data.description"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger delete-btn" data-dismiss="modal" @click="clear">Close</button>
          <button type="button" class="btn btn-submit" @click="saveComment" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useStore} from "../store/store";
import { reactive, defineProps } from "vue";

const store = useStore();
const props = defineProps([
  'feedback'
]);

const data = reactive({
  name: '',
  description:'',
  comments: []
});

function saveComment() {
  let comment = {
    id:props.feedback.id,
    name: data.name,
    description: data.description,
  }
  store.addComment(comment);
  clear();
}
function clear() {
  data.name = '',
  data.description = ''
}
</script>

<style scoped>

</style>