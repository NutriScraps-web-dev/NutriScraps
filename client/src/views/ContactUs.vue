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

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
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
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.message = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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

</style>
