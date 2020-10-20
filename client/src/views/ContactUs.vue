<template>
  <b-container class="contact-container">
    <div>
      <h3>Contact Us</h3>
      <br>
      <b-form @submit="sendEmail" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          class="email"
        >
          <b-form-input
            id="input-1"
            v-model="form.user_email"
            name="user_email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Name:" label-for="input-2" class="subject">
          <b-form-input
            id="input-2"
            v-model="form.user_name"
            name="user_name"
            required
            placeholder="Enter Your Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Message:" label-for="imput-3" class="message">
          <b-form-textarea
            id="textarea"
            v-model="form.message"
            required
            name="message"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <div class="d-flex pass-btn-con d-lg-block d-md-block">
        <b-button class="pass-btn my-2 mx-md-4 my-lg-4 px-3 px-md-5" type="submit" variant="primary">Submit</b-button>
        <b-button class="pass-btn my-2 mx-md-4 my-lg-4 px-3 px-md-5" type="reset" variant="danger">Cancel</b-button>
        </div>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  data() {
    return {
      form: {
        user_email: '',
        user_name: '',
        message: ''
      },
      show: true
    }
  },
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('contact_service', 'contact_form', e.target, 'user_14Bjs7n5tcUqKS6QSmOrr')
        .then((result) => {
          console.log('SUCCESS', result.status, result.text)
        }, (error) => {
          console.log('FAILED...', error)
        })
    },
    onReset() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>

.contact-container {
  margin: auto;
  padding: 20px;
}

.name{
  text-align: left;
}

.email{
  text-align: left;
}

.message{
  text-align: left;
}
.pass-btn {
  float: left;
}
@media screen and (max-width: 768px) {
  .pass-btn-con {
    display: flex;
    flex-direction: column !important;
  }
}
</style>
