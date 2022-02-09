
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
              <AddFeedback >Add</AddFeedback>
            </div>
          </div>
          <nav class="navbar navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <p class="comment-amount">{{ sortedList.length }} Suggestions</p>
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
      <Comment :feedback="data.modalData" />
      <DeleteFeedback :id="data.modalData.id"></DeleteFeedback>
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
import { useStore } from "../store/store";
import { reactive, computed} from "vue";


const store = useStore();

const data = reactive({
  classify: 1,
  modalData: {},
  category: '',
  fbl: store.feedbackList,
  searchingWord: ''
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
 return  ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
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


</script>

<style scoped>
#app {
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

/**************** mobile ****************/

.bg-dark {
  background: #3a4374 !important;
  color: white;
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

}
</style>