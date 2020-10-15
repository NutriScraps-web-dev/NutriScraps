<template>
  <b-container class="mt-3 form-container">
    <br>
    <h1><b>Create Your Recipe!</b></h1>
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
            placeholder="Preparation steps before cooking"
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
        <FormulateInput
          :options="[
          {value: 'Unspecified', label: 'Unspecified'},
          {value: 'Vegetarian', label: 'Vegetarian'},
          {value: 'Non-Vegetarian', value: 'Non-Vegetarian'},
          {value: 'Vegan', value: 'Vegan'}
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
        <button class="btn btn-info mx-1 px-5" type="submit">Create Recipe!</button>
      </FormulateForm>
    </b-form>
    <br>
    <br>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  props: ['recipe'],
  data() {
    return {
      recipes: {
        name: '',
        cuisine: '',
        preparation: [''],
        cookingProcess: [''],
        toServe: [''],
        type: '',
        image: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.recipes)
      const recipe = {
        name: this.recipes.name,
        cuisine: this.recipes.cuisine,
        preparation: this.recipes.preparation,
        cookingProcess: this.recipes.cookingProcess,
        toServe: this.recipes.toServe,
        type: this.recipes.type,
        image: this.recipes.image
      }
      console.log(recipe)
      Api.post('/recipes', this.recipes)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.form-container {
  width: 50vw !important;
}
@media screen and (max-width: 600px) {
  .form-container {
  width: 65vw !important;
}
}
@media screen and (max-width: 430px) {
  .form-container {
  width: 80vw !important;
}
}

</style>
