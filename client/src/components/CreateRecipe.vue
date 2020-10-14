<template>
  <b-container class="mt-3 form-container">
    <br>
    <h1><b>Create Your Recipe!</b></h1>
    <br>
    <b-form>
      <FormulateForm @submit="onSubmit">
          <FormulateInput
            element-class=""
            type="text"
            name="Recipe Name"
            placeholder="Recipe name"
            v-model="name"
            label="Recipe Name"
            validation="required"
          />

          <FormulateInput
            element-class=""
            type="text"
            name="Cuisine"
            placeholder="International, Mexican, Thai, Italian....."
            v-model="cuisine"
            label="Cuisine"
          />
          <FormulateInput
            element-class=""
            type="group"
            name="preparations"
            :repeatable="true"
            label="Preparation"
            add-label="+ Add Step"
          >
          <FormulateInput
            element-class=""
            type="text"
            name="preparation"
            placeholder="Preparation steps before cooking"
            v-model="preparation"
          />
          </FormulateInput>
          <FormulateInput
            element-class=""
            type="group"
            name="cooking"
            :repeatable="true"
            label="Cooking Process"
            add-label="+ Add Step"
            validation="required"
          >
          <FormulateInput
            element-class=""
            type="text"
            name="cooking-process"
            placeholder="Cooking Steps"
            v-model="cookingProcess"
            label="Cooking Process"
            help="Must have atleast one step"
          />
          </FormulateInput>
          <FormulateInput
            element-class=""
            type="group"
            name="serve"
            :repeatable="true"
            label="To Serve"
            add-label="+ Add Step"
          >
        <FormulateInput
          element-class=""
          type="text"
          name="toServe"
          placeholder="Help make the dish look pretty"
          v-model="toServe"
          label="To Serve"
        />
        </FormulateInput>
        <FormulateInput
          v-model="type"
          :options="{first: 'Unspecified', second: 'Vegetarian', third: 'Non-Vegetarian', fourth: 'Vegan'}"
          type="select"
          placeholder="Unspecified"
          label="Type"
        />
        <FormulateInput
            element-class=""
            type="text"
            name="image"
            placeholder="Imgur, Dropbox,etc"
            v-model="image"
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
      name: '',
      cuisine: '',
      preparation: [''],
      cookingProcess: [''],
      toServe: [''],
      type: '',
      image: ''
    }
  },
  methods: {
    onSubmit() {
      const recipe = {
        name: this.name,
        cuisine: this.cuisine,
        preparation: this.preparation,
        cookingProcess: this.cookingProcess,
        toServe: this.toServe,
        type: this.type.value,
        image: this.image
      }
      Api.post('/recipes', recipe)
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
