<template>
  <div>
    <b-card bg-variant="light">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          label-cols-lg="3"
          label="Update Password:"
          label-size="lg"
          label-class="pt-0 card-title"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="Current Password:"
            label-align-sm="right"
            label-for="current-password"
          >
            <b-form-input
              id="current-password"
              placeholder="Current Password"
              type="password"
              v-model="currentPassword"
              @blur="$v.currentPassword.$touch()"
              class="pass-input"
              :class="{ invalidInput: $v.currentPassword.$error }"
            ></b-form-input>
            <p v-if="$v.currentPassword.$error">This Field Must Not Be Empty</p>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="New Password:"
            label-align-sm="right"
            label-for="new-password"
          >
            <b-form-input
              id="new-password"
              placeholder="New Password"
              type="password"
              v-model="newPassword"
              @blur="$v.newPassword.$touch()"
              class="pass-input"
              :class="{ invalidInput: $v.newPassword.$error }"
            ></b-form-input>

            <p v-if="$v.newPassword.$error">
              Must Be At Least 8 Characters Long
            </p>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Confirm Password:"
            label-align-sm="right"
            label-for="confirm-password"
          >
            <b-form-input
              id="confirm-password"
              placeholder="Confirm Password"
              type="password"
              v-model="confirmPassword"
              @blur="$v.confirmPassword.$touch()"
              class="pass-input"
              :class="{ invalidInput: $v.confirmPassword.$error }"
            ></b-form-input>
            <p v-if="!$v.confirmPassword.sameAs">
              Passwords Does Not Match
            </p>
          </b-form-group>
        </b-form-group>
        <b-button
          variant="primary"
          class="ml-2 my-4 pass-btn px-5"
          v-b-toggle="'update-pass-col'"
          :disabled="$v.$invalid"
          type="submit"
          >Update</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  validations: {
    currentPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      sameAs: sameAs('newPassword')
    }
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        oldPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmPassword
      }
      console.log('working')
      this.$store.dispatch('changePassword', formData)
    }
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
