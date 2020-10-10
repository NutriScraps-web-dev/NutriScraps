<template>
  <div>
    <b-card v-if="roleInfo" bg-variant="light">
        <FormulateForm @submit="submitHandler"         @validation="hasError = $event.hasErrors"
>
          <b-form-group
            label-cols-lg="3"
            label="Update Role:"
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
                element-class=""
                id="role-name"
                type="text"
                v-model="roleInfo.role"
                validation="bail|required|alpha|max:20,length"
                :help="
                  `Must be a single word`
                "
              />
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Description:"
              label-align-sm="right"
              label-for="role-description"
            >
              <FormulateInput
                element-class=""
                id="role-description"
                type="text"
                v-model="roleInfo.description"
                validation="bail|required|max:50,length"
                :help="
                  `Keep it under 50 characters. ${50 -
                    roleInfo.description.length} left.`
                "
              />
            </b-form-group>
          </b-form-group>
          <div class="d-flex con-btn d-md-block">
          <b-button
            variant="primary"
            class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
            type="submit"
            :disabled="hasError"
            >Update</b-button
          >
                  <b-button
            variant="outline-primary"
            class="pass-btn my-2 mx-md-2 mx-lg-4 my-lg-4 px-5"
            v-b-toggle="'edit-role-col'"
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
      this.$store.dispatch('updateRole', this.roleInfo)
    }
  },
  computed: {
    ...mapGetters(['roleInfo'])
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
 .con-btn {
  justify-content: start;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
  .con-btn {
    flex-direction: column;
    justify-content: space-between;
    margin: 1rem !important;
  }
}
</style>
