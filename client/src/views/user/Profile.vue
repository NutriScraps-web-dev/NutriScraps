<template>
  <b-container v-if="userInfo" class="mt-5">
    <b-jumbotron class="jumbo">
      <div class="text-center">
        <h1 class="text-center mb-5">Personal info</h1>
      </div>
      <div class="border border-light">
        <div class="mx-4 border-bottom border-light">
          <h2 class="mx-2 mt-3 mb-4">Profile</h2>
        </div>
        <b-row class="mx-4 border-bottom border-light">
          <b-col class="my-4 d-flex info-container">
            <span class="h4 info-container-01 ">Name:</span>
            <span class="h4 text-left info-container-02 "
              >{{ userInfo.name.firstName }} {{ userInfo.name.lastName }}</span
            >
          </b-col>
        </b-row>
        <b-row class="mx-4 border-bottom border-light">
          <b-col class="my-4 d-flex info-container">
            <span class="h4 info-container-01 ">Username:</span>
            <span class="h4 text-left info-container-02 ">{{
              userInfo.username
            }}</span>
          </b-col>
        </b-row>
        <b-row class="mx-4 border-bottom border-light">
          <b-col class="my-4 d-flex info-container">
            <span class="h4 info-container-01 ">Email:</span>
            <span class="h4 text-left info-container-02 ">{{
              userInfo.email
            }}</span>
          </b-col>
        </b-row>
        <b-row class="mx-4 border-bottom border-light">
          <b-col class="my-4 d-flex info-container">
            <span class="h4 info-container-01 ">Country:</span>
            <span class="h4 text-left info-container-02 ">{{
              userInfo.country
            }}</span>
          </b-col>
        </b-row>
        <b-row class="mx-4 border-bottom border-light">
          <b-col class="my-4 d-flex info-container">
            <span class="h4 info-container-01 ">Role:</span>
            <span class="h4 text-left info-container-02 ">{{
              userInfo.roleType
            }}</span>
          </b-col>
        </b-row>
        <b-row class="mx-4 border-bottom border-light">
          <b-col class="my-4 d-flex info-container">
            <span class="h4 info-container-01 ">Bio:</span>
            <span class="h4 text-left info-container-02 ">{{
              userInfo.bio
            }}</span>
          </b-col>
        </b-row>

        <b-row class="mx-4">
          <b-col class="d-flex profile-btn">
            <b-button
              variant="outline-primary"
              class="my-2 mx-md-4 my-lg-4 px-3"
              v-b-toggle="'update-user-col'"
            >
              <font-awesome-icon icon="user-edit" class="mr-2" /> Update
              Profile</b-button
            >
            <b-button
              variant="outline-primary"
              class="my-2 mx-md-4 my-lg-4 px-3"
              v-b-toggle="'update-pass-col'"
            >
              <font-awesome-icon icon="key" class="mr-2" /> Update
              Password</b-button
            >
            <b-button
              variant="outline-danger"
              class="my-2 mx-md-4 my-lg-4 px-3"
              v-b-toggle="'delete-col'"
              ><font-awesome-icon icon="trash-alt" class="mr-2" /> Delete
              Account</b-button
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-collapse accordion="user-update" id="delete-col">
              <delete-account></delete-account>
            </b-collapse>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-collapse accordion="user-update" id="update-pass-col">
              <b-card>
                <pass-form></pass-form>
              </b-card>
            </b-collapse>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-collapse accordion="user-update" id="update-user-col">
              <b-card>
                <update-profile></update-profile>
              </b-card>
            </b-collapse>
          </b-col>
        </b-row>
      </div>
    </b-jumbotron>
    <b-row class="mt-3">
      <b-col>
        <user-posts></user-posts>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <user-comments></user-comments>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import { mapGetters } from 'vuex'
import ChangePasswordForm from '../../components/user/ChangePasswordForm.vue'
import UpdateProfile from '../../components/user/UpdateProfile.vue'
import DeleteAccount from '../../components/user/DeleteAccount.vue'
import UserComments from '../../components/user/UserComments'
import UserPosts from '../../components/user/UserPost'

export default {
  components: {
    'pass-form': ChangePasswordForm,
    'update-profile': UpdateProfile,
    'delete-account': DeleteAccount,
    'user-comments': UserComments,
    'user-posts': UserPosts
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
.info-container {
  justify-content: space-between;
  flex-wrap: wrap;
}
.info-container-01 {
  width: 30%;
}
.info-container-02 {
  width: 30%;
  min-width: 300px;
}
.profile-btn {
  justify-content: space-evenly;
  flex-wrap: wrap;
}
@media screen and (max-width: 768px) {
  .profile-btn {
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem !important;
  }
}
</style>
