<template>
  <b-container class="mt-3 form-container">
   <b-form>
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
            type="email"
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
        <button class="btn btn-info mx-1 px-5" type="submit">Sign Up</button>
      </FormulateForm>
    </b-form>
  </b-container>
  <!-- <b-form
    class="needs-validation"
    id="form"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div class="form-group">
      <div class="form-row">
        <div class="col">
          <label for="validationCustom01">First name</label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            placeholder="First name"
            v-model="firstName"
            required
          />
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
        <div class="col">
          <label for="validationCustom02">Last name</label>
          <input
            type="text"
            class="form-control"
            id="validationCustom02"
            placeholder="Last name"
            v-model="lastName"
            required
          />
          <div class="valid-feedback">
            Looks good!
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="form-row">
        <div class="col">
          <label for="validationCustomUsername">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend">@</span>
            </div>
            <input
              type="text"
              class="form-control"
              id="validationCustomUsername"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              v-model="username"
              required
            />
            <div class="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div class="col">
          <label for="validationCustom03">Email</label>
          <input
            type="email"
            class="form-control"
            id="validationCustom03"
            placeholder="Email"
            value=""
            v-model="email"
            required
          />
          <div class="valid-feedback">
            Please Enter valid Email!
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="form-row">
        <div class="col">
          <label for="validationCustom04">Password</label>
          <input
            type="password"
            class="form-control"
            id="validationCustom04"
            placeholder="Password"
            value=""
            v-model="password"
            required
          />
          <div class="valid-feedback">
            Please Enter valid Password!
          </div>
        </div>
        <div class="col">
          <label for="validationCustom05">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="validationCustom05"
            placeholder="Repeat Password"
            value=""
            v-model="confirmPassword"
            required
          />
          <div class="valid-feedback">
            Please Enter valid Password!
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>Country</label>
      <country-select
        class="form-control"
        v-model="country"
        :country="country"
        topCountry="SE"
        :autocomplete="true"
        :countryName="true"
      />
    </div>
    <div class="form-group">
      <label>Bio</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="bio"
      ></textarea>
    </div>
    <button class="btn btn-info mx-1 px-5" type="submit">Sign Up</button>
  </b-form> -->
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
