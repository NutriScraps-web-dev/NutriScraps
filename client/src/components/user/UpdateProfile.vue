<template>
  <div>
    <b-card bg-variant="light">
      <FormulateForm
        @submit="submitHandler"
        @validation="hasError = $event.hasErrors"
      >
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
            <FormulateInput
              element-class=""
              id="first-name"
              type="text"
              v-model="userInfo.name.firstName"
              validation="bail|required|alpha"
            />
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Last Name:"
            label-align-sm="right"
            label-for="last-name"
          >
            <FormulateInput
              element-class=""
              id="last-name"
              type="text"
              v-model="userInfo.name.lastName"
              validation="bail|required|alpha"
            />
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Country:"
            label-align-sm="right"
            label-for="country"
          >
            <country-select
              className="form-control country-picker-dd"
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
            <FormulateInput
              element-class=""
              id="bio"
              type="textarea"
              v-model="userInfo.bio"
              validation="max:50,length"
              error-behavior="live"
              rows="4"
              :help="
                `Keep it under 100 characters. ${50 -
                  userInfo.bio.length} left.`
              "
            />
          </b-form-group>
        </b-form-group>
        <div class="d-flex pass-btn-con d-lg-block d-md-block">
        <b-button
          variant="primary"
          class="pass-btn my-2 mx-md-4 my-lg-4 px-3 px-md-5"
          type="submit"
          :disabled="hasError"
          v-b-toggle="'update-user-col'"
          >Update</b-button
        >
        <b-button
          variant="outline-primary"
          class="pass-btn my-2 mx-md-4 my-lg-4 px-3 px-md-5"
          v-b-toggle="'update-user-col'"
          >Close</b-button
        >
        </div>
      </FormulateForm>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../../assets/formulate.css'

export default {
  data() {
    return {
      hasError: false
    }
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateProfile', this.userInfo)
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
.pass-btn[disabled] {
  background-color: #666666 !important;
  opacity: 0.2;
  cursor: not-allowed;
}
@media screen and (max-width: 768px) {
  .pass-btn-con {
    display: flex;
    flex-direction: column !important;
  }
}
</style>
