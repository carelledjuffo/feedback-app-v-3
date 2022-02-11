<template>
  <div class="main-content">
    <div class="comment-main-display">
      <div class="comment-header" v-if="!isMobile">
        <p class="comment-amount">{{ sortedList.length }} Suggestions</p>
        <div class="dropdown">
          <button class="btn btn-sort dropdown-toggle"
                  type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
            {{sortingMessage}}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="data.classify=1">Most Upvotes</a>
            <a class="dropdown-item" @click="data.classify=2">Least Upvotes</a>
            <a class="dropdown-item" @click="data.classify=3">Most Comments</a>
            <a class="dropdown-item" @click="data.classify=4">Least Comments</a>
            <input placeholder="category" class="input-category" @mouseleave="data.classify=5" v-model="data.category">
          </div>
        </div>
        <div class="search-input">
          <input v-model="data.searchingWord" @mousedown="data.classify=6" placeholder="search">
        </div>
        <AddFeedback class="add-btn-mobile">Add</AddFeedback>
        <div>
          <button class="btn btn-log-out" @click="logOut">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </button>
        </div>
      </div>



      <div class="comment-header-mobile" v-if="isMobile">
        <div class="pos-f-t">
          <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
              <div class="dropdown">
                <button class="btn btn-sort dropdown-toggle"
                        type="button" id="dropdownMenuButton1"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                  {{sortingMessage}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <a class="dropdown-item" @click="data.classify=1">Most Upvotes</a>
                  <a class="dropdown-item" @click="data.classify=2">Least Upvotes</a>
                  <a class="dropdown-item" @click="data.classify=3">Most Comments</a>
                  <a class="dropdown-item" @click="data.classify=4">Least Comments</a>
                  <input placeholder="category" class="input-category" @mouseleave="data.classify=5" v-model="data.category">
                </div>
              </div>
              <div class="search-input">
                <input v-model="data.searchingWord" @mousedown="data.classify=6" placeholder="search">
              </div>
              <div class="add-and-logout">
                <div>
                  <button class="btn btn-log-out" @click="logOut">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="red" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <nav class="navbar navbar-dark bg-dark">
            <button class="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <AddFeedback >Add</AddFeedback>
            <span class="comment-amount">
              <span class="comment-amount-message">
                 {{ sortedList.length }}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope-paper" viewBox="0 0 16 16">
                  <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z"/>
                </svg>
              </span>
            </span>
          </nav>
        </div>
      </div>
      <div
          v-for="feedback in sortedList"
          :key="feedback.id"
          class="single-comment-display"
          @click="setModalData(feedback)"
      >
        <FeedbackDisplay :feedback="feedback"></FeedbackDisplay>
      </div>
      <Comment :feedback="data.modalData"/>
      <DeleteFeedback :docId="data.modalData.docId"></DeleteFeedback>
      <EditFeedback :feedback="data.modalData"></EditFeedback>
    </div>
  </div>
</template>

<script setup>
import AddFeedback from "./AddFeedback.vue";
import FeedbackDisplay from "./FeedbackDisplay";
import Comment from "./Comment";
import DeleteFeedback from "./DeleteFeedback";
import EditFeedback from "./EditFeedback";
import router from "../router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useStore } from "../store/store";
import { reactive, computed} from "vue";



const store = useStore();
/* initialize store*/
if(!store.feedbackList.length) {
  store.getAllFeedbacks();
}

const data = reactive({
  classify: 1,
  modalData: {},
  category: '',
  fbl: store.feedbackList,
  searchingWord: '',
})
const sortingMessage = computed(() => {
  if(data.classify === 1) {
    return 'Most Upvotes'
  }
  if(data.classify === 2) {
    return 'Least Upvotes'
  }
  if(data.classify === 3) {
    return 'Most Comments'
  }if(data.classify === 4) {
    return 'Least Comments'
  }if(data.classify === 5) {
    if(data.category) {
      return data.category;
    } else {
      return '';
    }
  } else {
    return 'Searching...'
  }
})
const sortedList = computed(() => {
  if(data.classify == 1) {
    return sortByVotes('dsc');
  } if(data.classify == 2) {
    return sortByVotes('asc');
  }
  if(data.classify == 3) {
    return sortByComment('dsc');
  }if(data.classify == 4) {
    return sortByComment('asc');
  }if(data.classify == 5){
    return sortByCategory(data.category);
  } else {
    return searchData.value;
  }
})

const searchData = computed(() => {
  return data.fbl.filter((feedback) => {
    return feedback.title.toLowerCase().includes(data.searchingWord.toLowerCase());
  })
})
const isMobile = computed(() => {
  return window.innerWidth <= 700;
})
function setModalData(feedback) {
  data.modalData = feedback;
}
function sortByVotes(sortingMethod) {
  let tempList = [...store.feedbackList];
  tempList.sort(function (feedbackA, feedbackB) {
    if(sortingMethod == 'asc') {
      return feedbackA.upvote - feedbackB.upvote ;
    } else {
      return feedbackB.upvote - feedbackA.upvote;
    }
  });
  return tempList;
}
function sortByComment(sortingMethod) {
  let tempList = [...store.feedbackList]
  tempList.sort(function (feedbackA, feedbackB) {
    if(sortingMethod == 'asc') {
      return feedbackA.commentList.length - feedbackB.commentList.length ;
    } else {
      return feedbackB.commentList.length - feedbackA.commentList.length ;
    }
  });
  console.log(sortingMessage)
  return tempList;
}
function sortByCategory(category) {
  let listByCategory = sortedList.value.filter((feedback) => {
    return feedback.category.toLocaleLowerCase() === category.toLocaleLowerCase();
  })
  return  listByCategory;
}
function logOut() {
 firebase.auth().signOut().then(() => {
   console.log('user signed out');
   localStorage.setItem('isLoggedIn', 'false')
   router.push('/');
 }).catch((error) => {
   console.log(error)
 })
}
</script>

<style scoped>
#app {
}
.main-content {

}
.comment-header {
  height: 80px;
  min-width: 100%;
  background: #373f68;
  color: white;
  border-radius: 0.5em;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
}
.comment-main-display {
  flex: 0 0 94%;
}
.btn-sort, .btn-sort:hover {
  color: #fff;
  margin-top: 1em;
}
.btn-sort:focus{
  box-shadow: none;
}
.comment-amount {
  font-weight: 630;
  display: flex;
  justify-content: space-around;
}
.comment-header > p {
  font-size: 1em;
  align-self: center;
  margin-top: 7px;
}
.single-comment-display {
  transition: transform .1s ease-in;
}
.single-comment-display:hover {
  transform: scale(1.03);
}
.features {
  margin-bottom: 2em;
  display: flex;
  flex-flow: row;
}
.main-content {
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-left: 20%;
  margin-right: 20%;
}
.dropdown-toggle::after:active {
  transition: transform 1s ease-in;
  transform: rotateX(180deg);
}
.input-category {
  margin: 1em 1em 1em 1em;
}
.dropdown-item:hover{
  color: #ad1fea;
}
.dropdown-item:active{
  background: #f2f4ff;
}
.search-input {
  align-self: center;
}
.search-input > input,.search-input > input:focus {
  box-sizing: border-box;
  border-radius: 0.5em;
  outline: none;
  height: 2.5em;
  margin-bottom: 0.5em;
  padding-left: 0.5em;
  background: #f2f4ff;
}
.add-and-logout {
  display: flex;
  justify-content: flex-end;
}
.btn-log-out {
  margin-top: 0.7em;
  align-self: end;
}
/**************** mobile ****************/
.bg-dark {
  background: #3a4374 !important;
  color: white;
}
.btn {
  box-shadow: none;
}
.btn-sort:hover {
  color: #ad1fea;
}
.comment-amount-message {
  margin-right: 0.5em;
  font-size: 18px;
}
@media only screen and (max-width: 1200px) {
  .main-content {
    margin-left: 10%;
    margin-right: 10%;
  }
}
@media only screen and (max-width: 520px) {
  .main-content {
    margin-left: 2%;
    margin-right: 2%;
  }
  .comment-header {
    height: 100%;
    margin-bottom: 10%;
  }
  .comment-header {
    height: 80px;
    min-width: 100%;
  }
  .comment-main-display {
    margin: 0em 0.5em;
  }
  .search-input > input {
    min-width: 100%;
  }
  .search-input {
    margin-bottom: .5em;
  }
  .comment-amount {
    margin: 1em;
  }
  .btn-sort, .btn-sort:hover {
    margin-top: 0em;
    margin-bottom: .5em;
  }
  .btn-log-out {
    margin-top: -0.2em;
  }
}
</style>