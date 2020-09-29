<template>
  <div>
    <b-card bg-variant="light">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          label-cols-lg="3"
          label="Update Profile:"
          label-size="lg"
          label-class="pt-0 card-title"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="First Name:"
            label-align-sm="right"
            label-for="first-name"
          >
            <b-form-input
              id="first-name"
              type="text"
              v-model="userInfo.name.firstName"
              @blur="$v.firstName.$touch()"
              class="profile-input"
              :class="{ invalidInput: $v.firstName.$error }"
            ></b-form-input>
            <p v-if="$v.firstName.$error">Please Enter valid Name</p>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Last Name:"
            label-align-sm="right"
            label-for="last-name"
          >
            <b-form-input
              id="last-name"
              type="text"
              v-model="userInfo.name.lastName"
              @blur="$v.lastName.$touch()"
              class="profile-input"
              :class="{ invalidInput: $v.lastName.$error }"
            ></b-form-input>

            <p v-if="$v.lastName.$error">
              Please Enter Valid Name
            </p>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Country:"
            label-align-sm="right"
            label-for="country"
          >
            <country-select
              class="form-control"
              :autocomplete="true"
              v-model="userInfo.country"
              :country="userInfo.country"
              topCountry="SE"
              :countryName="true"
            />
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Bio:"
            label-align-sm="right"
            label-for="bio"
          >
            <b-form-textarea
              id="bio"
              v-model="userInfo.bio"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-form-group>
        <b-button
          variant="primary"
          class="ml-2 my-4 pass-btn px-5"
          v-b-toggle="'collapse-2'"
          :disabled="$v.$invalid"
          type="submit"
          >Update</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      bio: '',
      country: ''
    }
  },
  methods: {
    onSubmit() {
      console.log()
      // const formData = {
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   bio: this.bio
      // }
      // this.$store.dispatch('changePassword', formData)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>

<style scoped>
.card-title {
  font-size: 5rem;
}
.pass-btn {
  float: right;
}
.pass-input.invalidInput {
  border: 1px solid red !important;
  background-color: #ffc9aa !important;
}
p {
  color: red;
}
</style>
