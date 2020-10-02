<template>
  <div>
    <b-card v-if="selectedUserInfo" bg-variant="light">
        <FormulateForm @submit="submitHandler">
          <b-form-group
            label-cols-lg="3"
            label="Edit User:"
            label-size="lg"
            label-class="pt-0 card-title"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Role:"
              label-align-sm="right"
              label-for="role-name"
            >
              <FormulateInput

                :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
                type="select"
                placeholder="Select an Role"
                element-class=""
                id="role-name"
                validation="bail|required"
              />
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Bio:"
              label-align-sm="right"
              label-for="user-bio"
            >
              <FormulateInput
                element-class=""
                id="user-bio"
                type="text"
                v-model="selectedUserInfo.bio"
                validation="bail|max:50,length"
                :help="
                  `Keep it under 50 characters. ${50 -
                    selectedUserInfo.bio.length} left.`
                "
              />
            </b-form-group>
          </b-form-group>
          <b-button
            variant="primary"
            class="ml-2 my-4 pass-btn px-5"
            type="submit"
            >Update</b-button
          >
        </FormulateForm>
        <b-button
            variant="outline-primary"
            class="ml-2 my-4 pass-btn px-5"
            type="submit"
            v-b-toggle="'edit-role-col'"
            >Close</b-button
          >
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../../assets/formulate.css'

export default {
  methods: {
    submitHandler() {
      console.log('submitHandler')
      console.log(this.selectedUserInfo)
      this.$store.dispatch('updateUser', this.selectedUserInfo)
    }
  },
  computed: {
    ...mapGetters(['selectedUserInfo'])
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
