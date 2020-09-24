<template>
<form class="needs-validation" id="form" novalidate>
  <div class="form-group">
      <div class="form-row">
    <div class="col">
      <label for="validationCustom01">First name</label>
      <input type="text" class="form-control" id="validationCustom01" placeholder="First name" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col">
      <label for="validationCustom02">Last name</label>
      <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" required>
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
        <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required>
        <div class="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
    <div class="col">
      <label for="validationCustom02">Email</label>
      <input type="email" class="form-control" id="validationCustom02" placeholder="Email" value="" required>
      <div class="valid-feedback">
        Please Enter valid Email!
      </div>
    </div>
  </div>
</div>
<div class="form-group">  <div class="form-row">
      <div class="col">
      <label for="validationCustom02">Password</label>
      <input type="password" class="form-control" id="validationCustom02" placeholder="Password" value="" required>
      <div class="valid-feedback">
        Please Enter valid Password!
      </div>
    </div>
          <div class="col">
      <label for="validationCustom02">Confirm Password</label>
      <input type="password" class="form-control" id="validationCustom02" placeholder="Repeat Password" value="" required>
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
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <button class="btn btn-info mx-1 px-5" type="submit">Sign Up</button>
</form>
</template>

<script>

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
}
</script>

<style scoped>
#form {
  width: 40%;
  margin: 0rem auto;
  margin-top: 3rem;

}
</style>
