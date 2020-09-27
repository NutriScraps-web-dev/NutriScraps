<template>
  <div v-if="userInfo">
    <div>
      <h2 class="h2">Username:</h2>
      <h4>{{ userInfo.username }}</h4>
    </div>
    <div>
      <h2>Name:</h2>
      <h4>{{ userInfo.name.firstName }} {{ userInfo.name.lastName }}</h4>
    </div>
    <div>
      <h2>Email:</h2>
      <h4>{{ userInfo.email }}</h4>
    </div>
    <div>
      <h2>Country:</h2>
      <h4>{{ userInfo.country }}</h4>
    </div>
    <div>
      <h2>Bio:</h2>
      <h4>{{ userInfo.bio }}</h4>
    </div>
    <div>
      <h2>Your Role:</h2>
      <h4>{{ userInfo.roleType }}</h4>
    </div>
    <div>
      <h2>Your Posts:</h2>
      <h4>your Posts</h4>
    </div>
    <div>
      <h2>Your Comments:</h2>
      <h4>your Comments</h4>
    </div>
    <div>
      <h2>Post You Have Liked:</h2>
      <h4>Post You Have Liked:</h4>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  computed: {
    userInfo() {
      return !this.$store.getters.userInfo ? false : this.$store.getters.userInfo
    }
  },
  created() {
    this.$store.dispatch('getUserInfo')
  }
}
</script>
