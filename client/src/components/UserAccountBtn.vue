<template>
  <div>
    <div v-if="isLoggedIn">
      <b-dropdown variant="outline-info" class="drapdown">
        <template v-slot:button-content>
          <b-icon
            icon="person-fill"
            aria-hidden="true"
            class="account-icon"
          ></b-icon>
          <span class="account-text">Account</span>
        </template>
        <b-dropdown-item-button @click="logOut">
          <b-icon icon="power" aria-hidden="true" class="mr-2"></b-icon>
          <span class="dropdown-text">Log Out</span>
        </b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <b-link to="/users/mypage">
          <b-dropdown-item-button>
            <font-awesome-icon icon="user-edit" class="mr-2" />
            <span class="dropdown-text">Edit Profile</span>
          </b-dropdown-item-button>
        </b-link>
        <b-dropdown-divider></b-dropdown-divider>
        <b-link to="/users/mypass">
          <b-dropdown-item-button>
            <font-awesome-icon icon="key" class="mr-2" />
            <span class="dropdown-text">Change Password</span>
          </b-dropdown-item-button>
        </b-link>
      </b-dropdown>
      <b-button @click="getUserInfo">get info</b-button>
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
    ...mapActions(['logOut', 'getUserInfo'])
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
  margin-right: 1rem;
}
.dropdown-text {
  color: rgba(0, 0, 0, 0.7) !important;
}
.dropdown {
  margin-right: 2rem;
}
</style>
