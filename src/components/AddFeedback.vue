<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn add-btn" data-toggle="modal" data-target="#exampleModal">
    Add
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Feedback</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
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
            <div class="form-group">
              <label for="commentCategory">Category</label>
              <select  class="category-select"
                       id="commentCategory"
                       aria-label="Default select example" v-model="data.category">
                <option v-for="item in data.categoryList "
                        v-bind:key="item"
                >{{ item }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="commentDescription">Description</label>
              <textarea
                  class="form-control"
                  id="commentDescription"
                  rows="3"
                  v-model="data.description"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger delete-btn" data-dismiss="modal" @click="clear">Close</button>
          <button type="button" class="btn btn-submit" @click.prevent="saveFeedback" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "../store/store";
import { timestamp } from "../firebase/init";

const store = useStore();

const data = reactive({
  title: "",
  category: "",
  description: "",
  categoryList: store.categoryList,
});


const dateToday = new Date().toJSON();
console.log(dateToday)
 function saveFeedback() {
  data.category = data.category ? data.category : 'Everyone';


  store.getFeedbackId().then((querySnapshot) => {
    let currentFeedbackId = querySnapshot.docs[0].data().id;
    let feedback_idDocId = querySnapshot.docs[0].id;
    store.getUserName().then((querySnapshotForName) => {
      querySnapshotForName.forEach((doc) => {
        if(doc.data().email === localStorage.getItem('email')) {
          store.userName = doc.data().name;
        }
      })
      let feedback = {
        id: currentFeedbackId,
        name: store.userName,
        email: localStorage.getItem('email'),
        title: data.title,
        category: data.category,
        description: data.description,
        upvote: 0,
        commentList: [],
        createdAt: timestamp(),
        date: dateToday
      };
      store.addFeedback(feedback);
      store.incrementFeedbackId(feedback_idDocId, currentFeedbackId)
      clear();

    })
  })

}

function clear() {
  data.name = '';
  data.title = '';
  data.category = '';
  data.description = '';
}

</script>

<style scoped>
.form-group {
  margin-top: 2em;
}
.delete-btn {
  margin-left: 1em;
}
.btn-submit {
  background: #ad1fea;
  color: white;
}
.add-btn {
  margin-top: 0.5em;
  margin-bottom: 2em;
  color: white;
  background: #ad1fea;
  box-shadow: none;
  padding-bottom: 2.6em;
  box-sizing: border-box;
}
.add-btn:before {
  content: '+ ';
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-right: 2px;
  margin-bottom: -6px;
}
.add-btn a {
  color: white;
  text-decoration: none;
}
.category-select{
  min-width: 100%;
  height: 40px;
}

select option:hover {
  background: #ad1fea;
}
.modal {
  color: black;
}
.add-btn:hover {
  color: white;
}
@media only screen and (max-width: 620px) {
  .add-btn  {
    display: flex;
    flex-flow: row;
    margin-bottom: 0.6em;
    padding-bottom: 7px;
  }
  .add-btn:before {
    content: '';
    font-size: 25px;
    font-weight: bold;
    color: white;
    box-sizing: border-box;
  }

}
</style>