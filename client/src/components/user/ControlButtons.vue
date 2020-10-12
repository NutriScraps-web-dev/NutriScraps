<template>
  <div>
    <div v-if="isLoggedIn">
      <b-nav-item-dropdown variant="primary">
        <template v-slot:button-content>
          <b-icon
            icon="person-fill"
            aria-hidden="true"
            class="account-icon"
          ></b-icon>
          <span class="account-text">Account</span>
        </template>
        <b-dropdown-item @click="logOut">
          <b-icon icon="power" aria-hidden="true" class="mr-2"></b-icon>
          <span class="dropdown-text">Log Out</span>
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>
        <b-link to="/users/profile">
            <font-awesome-icon icon="user-circle" class="mr-2 icon-size" />
            <span class="dropdown-text">Profile</span>
        </b-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </div>
    <div class="signUp-btns" v-else>
      <li class="nav-item">
        <b-link
          class="nav-link btn btn-outline-info mx-1 px-5"
          to="/users/login"
          >Log In</b-link
        >
      </li>
      <li class="nav-item">
        <b-link
          class="nav-link btn btn-info mx-1 px-5 user-btn"
          to="/users/signup"
          >Sign Up</b-link
        >
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logOut'])
  }
}
</script>

<style scoped>
.user-btn:hover {
  background: none !important;
}
.signUp-btns {
  display: flex;
}
.account-icon {
  margin-left: 0.85rem;
  margin-right: 0.1rem;
}
.account-text {
  margin-left: 0.7rem;
}
.dropdown-text {
  color: rgba(0, 0, 0, 0.7) !important;
}
.dropdown {
  margin-right: 2rem;
}
.icon-size {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.7) !important;
}
</style>
