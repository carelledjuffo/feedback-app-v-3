<template>
  <div>
    <div class="fb-display" style="width: 200px">
      <div class="fb-upvote">
        <span class="btn upvote-btn" >
          <span class="arrow-up" @click="incrementUpvote">
           <svg xmlns="http://www.w3.org/2000/svg" :width="upVotedSize"
                :height="upVotedSize"
                :fill="upVotedColor"
                class="bi bi-chevron-up"
                viewBox="0 0 16 16">
           <path fill-rule="evenodd"
                 d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
           </span>
         <span> {{ props.feedback.upvote }} </span>
          <span class="arrow-down" @click="decrementUpvote">
           <svg xmlns="http://www.w3.org/2000/svg" :width="downVotedSize"
                :height="downVotedSize" :fill="downVotedColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
           <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
           </svg>
           </span>
        </span>
      </div>
      <div class="feedback-part-noVotes">
        <div class="fb-body">
          <div class="fb-title-duration">
            <p class="fb-title">{{ props.feedback.title }}</p>
          </div>
          <div class="fb-description">
            <p>{{ props.feedback.description }}</p>
          </div>
          <div>
            <button class="fb-category">
              <span>{{ props.feedback.category }}</span>
            </button>
            <button class="fb-name">
              <span>{{ props.feedback.name }}</span>
            </button>
            <button class=" btn fb-duration">
              <span>{{ feedbackDuration}}</span>
            </button>
          </div>
        </div>
        <div class="feedback-action">
          <div class="btn-edit">
            <button class="btn btn-edit" data-target="#editModal" data-toggle="modal" v-show="isHome && isOwner">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
              </span>
            </button>
          </div>
          <button class="btn btn-delete" data-target="#deleteModal" data-toggle="modal" v-show="isHome && isOwner">
          <span class="btn btn-delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path  fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
          </span>
          </button>
          <div class="btn-comment">
            <router-link :to="{ name: 'comment', params: { id: props.feedback.id }}" class="btn btn-comment" v-show="isHome">
              <span>
                <svg height="16" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                      xmlns="http://www.w3.org/2000/svg" d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                      fill="#CDD2EE" fill-rule="nonzero">
                  </path>
                </svg>
              </span>
              <span class="no-of-comments">{{ props.feedback.commentList.length }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "../store/store";
import { useRoute } from 'vue-router';
import moment from 'moment';

const route = useRoute();
const props = defineProps([
    'feedback'
])
const store = useStore();
const isHome = computed(() => {
  return route.path === '/home';
})
const currentUserEmail = localStorage.getItem('email');

const feedbackDuration = computed(() => {
  const dateOfFeedbackCreation = moment(props.feedback.date);
  return moment(dateOfFeedbackCreation).fromNow();
})
const isOwner = computed(() => {
  return props.feedback.email === currentUserEmail ||
      currentUserEmail === 'admin@admin.com';
})
const upVotedSize = computed(() => {
  return userHasUpVotedFeedback.value ? 22 : 16;
})
const downVotedSize = computed(() => {
  return userHasDownVotedFeedback.value ? 20 : 16;
})
const upVotedColor = computed(() => {
  return userHasUpVotedFeedback.value ? '#ad1fea' : 'currentColor';
})
const downVotedColor = computed(() => {
  return userHasDownVotedFeedback.value ? '#ad1fea' : 'currentColor';
})
const userHasUpVotedFeedback = computed(() => {
  return props.feedback.upVoters.includes(currentUserEmail);
})
const userHasDownVotedFeedback = computed(() => {
  return props.feedback.downVoters.includes(currentUserEmail);
})

function incrementUpvote() {
  if(userHasUpVotedFeedback.value) {
    console.log('Already upvoted')
  } else {
    if(userHasDownVotedFeedback.value) {
      console.log("must reverse")
      let downVoterIndex = props.feedback.downVoters.indexOf(currentUserEmail);
      store.removeDownVoter(props.feedback.docId, downVoterIndex, props.feedback.downVoters)
    }
    store.incrementUpvote(props.feedback.docId, props.feedback.upvote);
    store.addUpVoter(props.feedback.docId, props.feedback.upVoters, currentUserEmail);
  }

}
function decrementUpvote() {
  if(userHasDownVotedFeedback.value) {
    console.log('Already downvoted')
  } else {
    if(userHasUpVotedFeedback.value) {
      let upVoterIndex = props.feedback.upVoters.indexOf(currentUserEmail);
      store.removeUpVoter(props.feedback.docId, upVoterIndex, props.feedback.upVoters)

    }
    store.decrementUpvote(props.feedback.docId, props.feedback.upvote);
    store.addDownVoter(props.feedback.docId, props.feedback.downVoters, currentUserEmail);
  }

}

</script>

<style scoped>
.fb-display {
  display: flex;
  flex-flow: row;
  background: white;
  margin-top: 1.5em;
  border-radius: 1em;
  min-width: 100%;
  min-height: 150px;
}
.feedback-part-noVotes {
  display: flex;
  flex-flow: row;
  flex: 0 0 84%;
}
.feedback-action {
  display: flex;
  flex-flow: row;
  margin-left: 2%;
}
.fb-upvote {
  flex: 0 0 10%;
  margin-right: 2%;
  margin-left: 2%;
  align-self: center;
}
.upvote-btn {
  color: #3a4374;
  border-radius: 0.4em;
  font-weight: bold;
}
.fb-body {
  flex: 0 0 70%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
.fb-name, fb-duration{
  background: #f2f4ff;
  color:#ad1fea;
  border-radius: 0.3em;
  border: none;
  margin-bottom: 0.3em;
  margin-left: 1em;
}
.fb-category {
  background: #f2f4ff;
  color: #506ae7;
  border-radius: 0.3em;
  border: none;
  margin-bottom: 0.3em;
}
.fb-title {
  font-size: 1.5em;
  margin-top: 0.5em;
  color: #3a4374;
  font-weight: 630;
}
.btn-comment {
  flex: 0 0 10%;
  align-self: center;
  margin-right: 1%;
  display: flex;
  flex-flow: row;
}
.btn-delete, .btn-delete:focus {
  flex: 0 0 8%;
  align-self: center;
  box-shadow: none;
  color: #3a4374;
}
.btn-edit, .btn-edit:focus{
  flex: 0 0 8%;
  align-self: center;
  box-shadow: none;
  color: #3a4374;
}
.btn.btn-comment {
  box-shadow: none;
}
.no-of-comments {
  margin-left: 0.3em;
  color: #3a4374;
  font-weight: bold;
}
.upvote-btn {
  display: flex;
  flex-flow: column;
}
.btn-delete > svg {
  color: #3a4374;
}
.fb-duration {
  font-size: 15px;
  font-style: italic;
  color: #3a4374;
}

@media only screen and (max-width: 750px) {
  .fb-body {
    flex: 0 0 55%;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }
  .btn-delete {
    flex: 0 0 1%;
    align-self: center;
    box-shadow: none;
    color: #3a4374;
  }
  .btn-comment {
    flex: 0 0 10%;
    align-self: center;
    margin-right: 1%;
    margin-top: 4%;
  }
  .btn-edit {
    flex: 0 0 1%;
  }
  .fb-upvote {
    flex: 0 0 5%;
    align-self: center;
  }
  .no-of-comments {
    margin-left: 0.1em;
  }
}

@media only screen and (max-width: 520px) {
  .feedback-part-noVotes{
    display: flex;
    flex-flow: column;
  }
  .fb-upvote {
    flex: 0 0 10%;
    align-self: center;
  }
  .fb-body {
    flex: 0 0 30%;
    display: flex;
    flex-flow: column;
  }
  .btn-delete {
    flex: 0 0 1%;
  }
  .btn-comment {
    flex: 0 0 20%;
    margin-bottom: 3%;
  }
  .btn-edit {
    flex: 0 0 1%;
  }
  .fb-duration {
    font-size: 10px;
    font-style: italic;
  }

}
</style>