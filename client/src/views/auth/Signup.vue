<template>
  <b-container class="mt-3 form-container mb-5">
    <FormulateForm @submit="onSubmit">
      <FormulateInput
        element-class=""
        type="text"
        name="first Name"
        placeholder="First name"
        v-model="firstName"
        label="First Name"
        validation="bail|required|alpha"
      />

      <FormulateInput
        element-class=""
        type="text"
        name="last Name"
        placeholder="Last name"
        v-model="lastName"
        label="Last Name"
        validation="bail|required|alpha"
      />
      <FormulateInput
        element-class=""
        type="text"
        name="username"
        placeholder="Username"
        v-model="username"
        label="Username"
        validation="bail|required|alphanumeric"
      />
      <FormulateInput
        element-class=""
        type="text"
        name="email"
        placeholder="Email"
        v-model="email"
        label="Email"
        validation="bail|required|email"
      />
      <FormulateInput
        element-class=""
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
        label="Password"
        validation="bail|required|alphanumeric|min:8,length"
        help="Must be 8 characters long"
      />
      <FormulateInput
        element-class=""
        type="password"
        name="confirm Password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        label="Confirm Password"
        validation="bail|required|alphanumeric|confirm:password"
      />
      <div class="form-group">
        <label>Country</label>
        <country-select
          class="form-control"
          v-model="country"
          :country="country"
          topCountry="SE"
          :autocomplete="true"
          :countryName="true"
          placeholder="Sweden"
        />
      </div>
      <FormulateInput
        element-class=""
        type="textarea"
        name="bio"
        placeholder="Bio"
        v-model="bio"
        label="Bio:"
        validation="max:50"
      />
      <b-button
        class="btn btn-info mx-1 px-5 pass-btn"
        type="submit"
        >Sign Up</b-button
      >
    </FormulateForm>
  </b-container>
</template>

<script>
import '../../assets/formulate.css'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      country: 'Sweden'
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        name: {
          firstName: this.firstName,
          lastName: this.lastName
        },
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        country: this.country,
        bio: this.bio
      }
      this.$store.dispatch('signUp', formData)
    }
  }
}
</script>

<style scoped>
.form-container {
  width: 50vw !important;
}
@media screen and (max-width: 600px) {
  .form-container {
    width: 65vw !important;
  }
}
@media screen and (max-width: 430px) {
  .form-container {
    width: 80vw !important;
  }
}
</style>
