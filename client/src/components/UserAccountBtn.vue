<template>
  <div>
    <div v-if="isLogedIn">
      <b-dropdown variant="outline-info" class="mr-4">
        <template v-slot:button-content>
          <b-icon
            icon="person-fill"
            aria-hidden="true"
            class="account-icon"
          ></b-icon>
          <span class="account-text">Account</span>
        </template>
        <b-dropdown-item-button>
          <b-icon icon="power" aria-hidden="true" class="mr-2"></b-icon>
          <span class="dd-text">Log Out</span>
        </b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button>
          <b-icon
            icon="gear-fill"
            aria-hidden="true"
            class="mr-2"
          ></b-icon>
          <span class="dd-text">Edit</span>
        </b-dropdown-item-button>
      </b-dropdown>
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
.dd-text {
  color: rgba(0, 0, 0, 0.7) !important;
}
</style>
