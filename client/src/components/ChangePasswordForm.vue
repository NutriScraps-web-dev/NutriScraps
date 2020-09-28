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
              :class="{ 'is-invalid': $v.currentPassword.$error }"
            ></b-form-input>
            <b-form-invalid-feedback :state="is - invalid">
              This Field Must Not be Empty
            </b-form-invalid-feedback>
            <b-form-valid-feedback
              :state="!$v.currentPassword.$error && $v.currentPassword.$dirty"
            >
              Looks Good.
            </b-form-valid-feedback>
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
              :class="{ 'is-invalid': $v.newPassword.$error }"
            ></b-form-input>
            <b-form-invalid-feedback :state="is - invalid">
              <p v-if="!$v.newPassword.minLeg">
                Must Be At Least 8 Characters Long
              </p>
              <p v-if="!$v.newPassword.required">
                This Field Must Not be Empty
              </p>
            </b-form-invalid-feedback>
            <b-form-valid-feedback
              :state="!$v.newPassword.$error && $v.newPassword.$dirty"
            >
              Looks Good.
            </b-form-valid-feedback>
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
              :class="{ 'is-invalid': $v.confirmPassword.$error }"
            ></b-form-input>
            <b-form-invalid-feedback :state="is - invalid">
              Passwords Does Not Match
            </b-form-invalid-feedback>
            <b-form-valid-feedback
              :state="!$v.confirmPassword.$error && $v.confirmPassword.$dirty"
            >
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
        </b-form-group>
      </b-form>
      <b-button
        variant="primary"
        class="ml-2 my-4 pass-btn px-5"
        v-b-toggle="'collapse-2'"
        :disabled="$v.$invalid"
        >Update</b-button
      >
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
      minLeg: minLength(8)
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
      this.$store.dispatch('signUp', formData)
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
</style>
