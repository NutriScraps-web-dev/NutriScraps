<template>
  <b-container class="mt-3 form-container">
    <br>
    <b-form>
      <FormulateForm v-model="recipes"  @submit="onSubmit">
          <FormulateInput
            element-class=""
            type="text"
            name="name"
            placeholder="Recipe name"
            label="Recipe Name"
            validation="required"
          />
          <FormulateInput
            element-class=""
            type="text"
            name="cuisine"
            placeholder="International, Mexican, Thai, Italian....."
            label="Cuisine"
          />
          <FormulateInput
            element-class=""
            type="textarea"
            name="preparation"
            label="Preparation"
            disabled
          />
          <FormulateInput
            element-class=""
            type="textarea"
            name="cookingProcess"
            label="Cooking Process"
            disabled
          />
          <FormulateInput
            element-class=""
            type="textarea"
            name="toServe"
            label="To Serve"
            disabled
          />
          <!--
          <FormulateInput
            element-class=""
            type="group"
            name="preparation"
            :repeatable="true"
            label="Preparation"
            add-label="+ Add Step"
          >
          <FormulateInput
            element-class=""
            type="text"
            name="preparation"
          />
          </FormulateInput>
          <FormulateInput
            element-class=""
            type="group"
            name="cookingProcess"
            :repeatable="true"
            label="Cooking Process"
            add-label="+ Add Step"
            validation="required"
          >
          <FormulateInput
            element-class=""
            type="text"
            name="cookingProcess"
            placeholder="Cooking Steps"
            label="Cooking Process"
            help="Must have atleast one step"
          />
          </FormulateInput>
          <FormulateInput
            element-class=""
            type="group"
            name="toServe"
            :repeatable="true"
            label="To Serve"
            add-label="+ Add Step"
          >
        <FormulateInput
          element-class=""
          type="text"
          name="toServe"
          placeholder="Help make the dish look pretty"
          label="To Serve"
        />
        </FormulateInput>
        -->
        <FormulateInput
          :options="[
          {value: 'Unspecified', label: 'Unspecified'},
          {value: 'Vegetarian', label: 'Vegetarian'},
          {value: 'Non-Vegetarian', label: 'Non-Vegetarian'},
          {value: 'Vegan', label: 'Vegan'}
          ]"
          type="select"
          placeholder="Unspecified"
          label="Type"
          name="type"
        />
        <FormulateInput
            element-class=""
            type="text"
            name="image"
            placeholder="Imgur, Dropbox,etc"
            label="Image Link"
          />
          <br>
        <button class="btn btn-info mx-1 px-5" type="submit">Update Recipe!</button>
      </FormulateForm>
    </b-form>
    <br>
    <br>
  </b-container>
</template>
<script>
import { Api } from '@/Api'
import auth from '../store/modules/auth'
import toast from '../assets/toast'

export default {
  name: 'recipe',
  data() {
    return {
      recipes: [],
      message: '',
      text: ''
    }
  },
  mounted() {
    Api.get(`/recipes/${this.$route.params.id}`)
      .then(response => {
        this.recipes = response.data
      })
      .catch(error => {
        this.message = error.message
        this.recipes = []
        // TODO: display error message
      })
      .then(() => {
        //   This code is always executed at the end. After success or failure.
      })
  },
  methods: {
    onSubmit() {
      /* const preparations = this.recipes.preparation.map(a => a.preparation)
      const cookingProcesses = this.recipes.cookingProcess.map(a => a.cookingProcess)
      const toServes = this.recipes.toServe.map(a => a.toServe)
      */
      const recipe = {
        name: this.recipes.name,
        cuisine: this.recipes.cuisine,
        type: this.recipes.type,
        image: this.recipes.image
      }
      Api.patch(`/recipes/${this.$route.params.id}`, recipe, {
        headers: {
          Authorization: `Bearer ${auth.state.authToken}`
        }
      })
        .then(response => {
          toast.success('Your Recipe has been updated!')
          this.$router.push({ name: 'recipe', params: { id: this.recipes._id } })
        })
    }
  }
}
</script>
