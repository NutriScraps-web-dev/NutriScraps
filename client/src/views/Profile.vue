<template>
  <b-container v-if="userInfo" class="profile-container">
    <b-jumbotron class="jumbo">
      <b-row offset="1">
        <h1>Your Profile</h1>
      </b-row>
      <b-row cols="6">
        <b-col cols="6" offset="2">
          <h2>Name:</h2>
          <h4>{{ userInfo.name.firstName }} {{ userInfo.name.lastName }}</h4>
        </b-col>
        <b-col>
          <h2 class="h2">Username:</h2>
          <h4>{{ userInfo.username }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" offset="2">
          <h2>Email:</h2>
          <h4>{{ userInfo.email }}</h4>
        </b-col>
        <b-col>
          <h2>Country:</h2>
          <h4>{{ userInfo.country }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" offset="2">
          <h2>Bio:</h2>
          <h4>{{ userInfo.bio }}</h4>
        </b-col>
        <b-col>
          <h2>Your Role:</h2>
          <h4>{{ userInfo.roleType }}</h4>
        </b-col>
      </b-row>
      <b-row offset="4">
        <b-col cols="6" offset="2">
          <b-button variant="outline-primary" class="mr-5 my-4" v-b-toggle="'update-user-col'"
            >Update Profile</b-button
          >
          <b-button
            variant="outline-primary"
            class="ml-2 my-4"
            v-b-toggle="'update-pass-col'"
            >Update Password</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-collapse accordion="user-update" id="update-pass-col">
            <b-card
            >
              <pass-form></pass-form>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
            <b-row>
        <b-col>
          <b-collapse accordion="user-update" id="update-user-col">
            <b-card
            >
              <update-profile></update-profile>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
    </b-jumbotron>
    <b-row class="mt-3">
      <b-col>
        <h2>Your Posts:</h2>
        <b-col>your Posts</b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-button variant="outline-primary" class="mr-5 my-4"
        >Delete All My Post</b-button
      >
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <h2>Your Comments:</h2>
        <div>your Comments</div>
      </b-col>
    </b-row>
    <b-row>
      <b-button variant="outline-primary" class="mr-5 my-4"
        >Delete All My comments</b-button
      >
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <h2>Post You Have Liked:</h2>
        <div>Post You Have Liked:</div>
      </b-col>
    </b-row>
    <b-row>
      <b-button variant="outline-primary" class="mr-5 my-4"
        >Remore My Likes</b-button
      >
    </b-row>
  </b-container>
</template>

<script>
// import { mapGetters } from 'vuex'
import ChangePasswordForm from '../components/ChangePasswordForm.vue'
import UpdateProfile from '../components/UpdateProfile.vue'

export default {
  components: {
    'pass-form': ChangePasswordForm,
    'update-profile': UpdateProfile
  },
  computed: {
    userInfo() {
      return !this.$store.getters.userInfo
        ? false
        : this.$store.getters.userInfo
    }
  },
  created() {
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style scoped>
.profile-container {
  margin-top: 2rem;
}
</style>
