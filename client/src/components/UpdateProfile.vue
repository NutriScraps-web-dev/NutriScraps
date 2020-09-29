<template>
  <div>
    <b-card bg-variant="light">
        <FormulateForm @submit="submitHandler">
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
                  `Keep it under 100 characters. ${100 -
                    userInfo.bio.length} left.`
                "
              />
            </b-form-group>
          </b-form-group>
          <b-button
            variant="primary"
            class="ml-2 my-4 pass-btn px-5"
            v-b-toggle="'collapse-2'"
            type="submit"
            >Update</b-button
          >
        </FormulateForm>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../assets/formulate.css'

export default {
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
</style>
