<template>
  <b-container class="login-container">
    <b-card class="login-card" bg-variant="light">
      <b-link to="/" class="close colse-blink" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </b-link>
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
      this.$store.dispatch('logIn', formData)
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
.colse-blink {
  font-size: 2rem;
}
</style>
