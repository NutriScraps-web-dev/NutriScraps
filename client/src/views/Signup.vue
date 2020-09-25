<template>
<b-form class="needs-validation" id="form" novalidate @submit.prevent="onSubmit">
  <div class="form-group">
      <div class="form-row">
    <div class="col">
      <label for="validationCustom01">First name</label>
      <input type="text" class="form-control" id="validationCustom01" placeholder="First name" v-model="firstName" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col">
      <label for="validationCustom02">Last name</label>
      <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" v-model="lastName" required>
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
        <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" v-model="username" required>
        <div class="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
    <div class="col">
      <label for="validationCustom03">Email</label>
      <input type="email" class="form-control" id="validationCustom03" placeholder="Email" value="" v-model="email" required>
      <div class="valid-feedback">
        Please Enter valid Email!
      </div>
    </div>
  </div>
</div>
<div class="form-group">  <div class="form-row">
      <div class="col">
      <label for="validationCustom04">Password</label>
      <input type="password" class="form-control" id="validationCustom04" placeholder="Password" value="" v-model="password" required>
      <div class="valid-feedback">
        Please Enter valid Password!
      </div>
    </div>
          <div class="col">
      <label for="validationCustom05">Confirm Password</label>
      <input type="password" class="form-control" id="validationCustom05" placeholder="Repeat Password" value="" v-model="confirmPassword" required>
      <div class="valid-feedback">
        Please Enter valid Password!
      </div>
    </div>
  </div></div>
    <div class="form-group">
            <label >Country</label>
    <country-select class="form-control" v-model="country" :country="country" topCountry="SE" />
    </div>
      <div class="form-group">
    <label>Bio</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="bio"></textarea>
  </div>
  <button class="btn btn-info mx-1 px-5" type="submit">Sign Up</button>
</b-form>
</template>

<script>
import { Api } from '@/Api'

(function () {
  'use strict'
  window.addEventListener('load', function () {
    const forms = document.getElementsByClassName('needs-validation')
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
})()
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
      country: ''
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
        bio: this.bio,
        roleType: 'user'
      }
      console.log(formData)
      Api.post('/users/signup', formData).then(res => {
        this.$router.push('/users/login')
        console.log(res)
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
#form {
  width: 40%;
  margin: 0rem auto;
  margin-top: 3rem;

}
</style>
