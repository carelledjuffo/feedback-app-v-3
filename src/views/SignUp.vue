<template>
  <div class="about">
    <div class="login-image">
      <img src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" width="150" alt="">
    </div>
    <div class="login-infos">
      <form>
        <div class="form-group">
          <div class="form-group">
            <label for="exampleInputPassword2">Name</label>
            <input type="text" class="form-control" id="exampleInputPassword2" placeholder="Name" v-model="data.name">
          </div>
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Enter email" v-model="data.email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="data.password">
        </div>
        <button type="submit" class="btn btn-login" @click.prevent="signUp()">Sign Up</button>
      </form>
      <div class="error-meesage">{{data.error}}</div>
    </div>

  </div>
</template>

<script setup>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {reactive} from "vue";
import router from "../router";
import {useStore} from "../store/store";

const store = useStore();
const data = reactive({
  email: '',
  password: '',
  name:'',
  error: ''
})

 async function signUp() {
  try{
    await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    const user = {
      email: data.email,
      name: data.name
    }
    store.storeUser(user);
    localStorage.setItem('email', data.email);
    localStorage.setItem('isLoggedIn', 'true')
    store.getUserName().then((querySnapshotForName) => {
      querySnapshotForName.forEach((doc) => {
        if(doc.data().email === localStorage.getItem('email')) {
          store.userName = doc.data().name;
        }
      })

    })
    await router.push('/home');
  } catch (e) {
    data.error = e.message;
  }

}
</script>

<style scoped>

.about {
  background: white;
  color: #2c3e50;
  min-height: 50vh ;
  margin: 1em 1em;
  padding: 0.5em;
  border-radius: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}
.login-image {
  text-align: center;
}
.btn-login {
  background: #ad1fea;
  color: white;
}
.error-meesage {
  color: red;
}
.btn {
  box-shadow: none;
}

@media only screen and (min-width: 500px) {
  .about {
    width: 50%;
    margin: 0 auto;
  }
}
@media only screen and (min-width: 900px) {
  .about {
    width: 35vw;
    margin: 0 auto;
    padding: 1em;
  }
}
@media only screen and (min-width: 1200px) {
  .about {
    width: 20vw;
    margin: 0 auto;
    padding: 1em;
  }
}

</style>