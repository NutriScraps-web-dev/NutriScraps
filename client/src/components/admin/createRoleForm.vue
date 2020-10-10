<template>
  <div>
    <b-card bg-variant="light">
      <FormulateForm @submit="submitHandler">
        <b-form-group
          label-cols-lg="3"
          label="Create Role:"
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
              v-model="role"
              validation="bail|required|alpha|max:20,length"
              :help="`Must be a single word`"
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
              v-model="description"
              validation="bail|required|max:50,length"
              :help="
                `Keep it under 50 characters. ${50 - description.length} left.`
              "
            />
          </b-form-group>
        </b-form-group>
        <div class="d-flex con-btn d-md-block">
          <b-button
            variant="primary"
            class="pass-btn my-2 mx-md-4 my-lg-4 px-5"
            type="submit"
            v-b-toggle="'create-role-col'"
            >Create</b-button
          >
          <b-button
            variant="outline-primary"
            class="pass-btn my-2 mx-md-4 my-lg-4 px-5"
            v-b-toggle="'create-role-col'"
            >Close</b-button
          >
        </div>
      </FormulateForm>
    </b-card>
  </div>
</template>

<script>
import '../../assets/formulate.css'

export default {
  data() {
    return {
      role: '',
      description: ''
    }
  },
  methods: {
    submitHandler() {
      const roleData = {
        role: this.role,
        description: this.description
      }
      this.$store.dispatch('createRole', roleData)
    }
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
  .data-tbl{
   overflow-x: hidden;
  }
  .content-col{
    min-width: 19rem;
    margin-right: 20rem;
  }
  .con-b-card{
    display: none;
  }
}

</style>
