<template>
  <div class="about">
    <div class="login-image">
      <img src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" width="150" alt="">
    </div>
    <div class="login-infos">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-login">Login</button>
      </form>
    </div>

  </div>
</template>

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