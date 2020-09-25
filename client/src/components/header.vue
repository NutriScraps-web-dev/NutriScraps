<template>
  <b-navbar toggleable="lg" class="navbar navbar-light nav" style="">
    <b-navbar-brand>
      <b-link to="/">
        <img class="navbar-logo" src="../assets/foodlogo.png" alt="NutriScraps">
      </b-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
            <li class="nav-item">
              <b-link class="nav-item nav-link mx-2 px-2" to="/about">About</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-item nav-link mx-2 px-2" to="/contact">Contact</b-link>
            </li>
            <li class="nav-item" v-if="isLogedIn">
              <b-link class="nav-link btn btn-info mx-1 px-5 user-btn" to="/users/signup">Log Out</b-link>
            </li>
            <div class="signUp-btns" v-else>
              <li class="nav-item">
              <b-link class="nav-link btn btn-outline-info mx-1 px-5" to="/users/login">Log In</b-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-link btn btn-info mx-1 px-5 user-btn" to="/users/signup">Sign Up</b-link>
            </li>
            </div>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { eventBus } from '../main'

export default {
  data() {
    return {
      isLogedIn: false
    }
  },
  created() {
    eventBus.$on('userLogedIn', (data) => {
      this.isLogedIn = data
    })
  }
}
</script>

<style scoped>
.nav {
  background-color: #e3f2fd;
}
.navbar-logo {
  width: 35px;
}
.user-btn:hover {
  background: none !important;
}

.signUp-btns {
  display: flex;
}
</style>
