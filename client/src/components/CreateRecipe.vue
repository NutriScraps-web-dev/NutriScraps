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
        />
        </FormulateInput>
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
      <div class="d-flex pass-btn-con d-lg-block d-md-block">
        <b-button
          variant="primary"
          class="pass-btn my-2 mx-md-4 my-lg-4 px-3 px-md-5"
          type="submit"
          >Create Recipe!</b-button
        >
        <b-button
          variant="outline-primary"
          class="pass-btn my-2 mx-md-4 my-lg-4 px-3 px-md-5"
          action="action"
          onclick="window.history.go(-1); return false;"
          >Back</b-button
        >
      </div>
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
      const preparations = this.recipes.preparation.map(a => a.preparation)
      console.log(preparations)
      const cookingProcesses = this.recipes.cookingProcess.map(a => a.cookingProcess)
      console.log(cookingProcesses)
      const toServes = this.recipes.toServe.map(a => a.toServe)
      console.log(toServes)
      const recipe = {
        name: this.recipes.name,
        cuisine: this.recipes.cuisine,
        preparation: preparations,
        cookingProcess: cookingProcesses,
        toServe: toServes,
        type: this.recipes.type,
        image: this.recipes.image
      }
      console.log(recipe)
      Api.post('/recipes', recipe, {
        headers: {
          Authorization: `Bearer ${auth.state.authToken}`
        }
      })
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
      toast.success('Your Recipe has been created!')
      this.$router.push({ name: 'home' })
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
.pass-btn {
  float: left;
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
