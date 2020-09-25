<template>
  <b-container class="login-container">
    <b-card class="login-card" bg-variant="light">
      <h2>Log In</h2>
      <b-form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend">@</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              v-model="username"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value=""
            v-model="password"
            required
          />
        </div>

        <button type="submit" class="btn btn-info btn-lg btn-block px-5">
          Log In
        </button>

        <p class="accout text-right mt-2 mb-4">
          <b-link to="/users/signup">Don't Have Accout Yet?</b-link>
        </p>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        username: this.username,
        password: this.password
      }
      console.log(formData)
      Api.post('/users/login', formData)
        .then(res => {
          this.$router.push('/')
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.login-card {
  min-width: 25%;
  min-height: 60%;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3) !important;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
