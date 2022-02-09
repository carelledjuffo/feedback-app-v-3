<template>
  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Feedback</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div>

        </div>
        <div class="modal-body">
          <form class="form-form">
            <div class="form-group">
              <label for="commentTitle">Title</label>
              <input
                  type="text"
                  class="form-control"
                  id="commentTitle"
                  v-model="data.title"
              />
            </div>
            <div class="form-validation">{{ data.error.title }}</div>
            <div class="form-group">
              <label for="commentCategory">Category</label>
              <select  class="category-select"  id="commentCategory" aria-label="Default select example" v-model="data.category">
                <option v-for="item in data.categoryList " v-bind:key="item">{{ item }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="CommentDescription">Description</label>
              <textarea
                  class="form-control"
                  id="CommentDescription"
                  rows="3"
                  v-model="data.description"
              ></textarea>
            </div>
            <div class="form-validation">{{ data.error.description }}</div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger delete-btn" data-dismiss="modal" >Close</button>
          <button type="button" class="btn btn-submit" @click="saveChanges">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "../store/store";
import {reactive, defineProps } from "vue";

const store = useStore();
const props = defineProps([
  'feedback'
]);

const data = reactive({
  title: '',
  category: '',
  description: '',
  categoryList: store.categoryList,
  error: {
    title: '',
    description: '',
  }
});

function saveChanges() {
  validation();
  if(data.title && data.category && data.description) {
    let editData = {
      id: props.feedback.id,
      title: data.title,
      category: data.category,
      description: data.description
    }
    store.editFeedback(editData);
    clear();
  }
}

function validation() {
  if(!data.title) {
    data.error.title = "Title is required"
  }
  if(!data.description) {
    data.error.description = "Description is required";
  }
}
function clear() {
  data.title = '';
  data.category = '';
  data.description = '';
}

</script>

<style scoped>
.btn-submit {
  background: #3a4374;
  color: #f2f4ff;
}
.category-select{
  min-width: 100%;
  height: 40px;
}
.form-validation {
  color: red;
}
</style>