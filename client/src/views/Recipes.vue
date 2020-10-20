<template>
  <b-container>
    <b-row>
      <b-col cols="8" offset="1" offset-md="2" style="margin:auto">
        <b-input-group class="mb-2">
          <b-input-group-append is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-append>
          <b-form-input
            type="search"
            v-model="search"
            placeholder="Search Recipes"
            @submit="getExternalRecipe()"
          ></b-form-input>
        </b-input-group>
        <b-form-select
          v-model="selected"
          :options="options"
          class="f-in-put"
        ></b-form-select>

        <b-form @submit.prevent="getExternalRecipe">
            <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="search"
          type="text"
          required
          placeholder="food"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
    <br />
    <br />
    <b-row align-h="center" style="margin:auto">
      <b-col
        cols="12"
        sm="6"
        md="4"
        v-for="recipe in filteredRecipes"
        v-bind:key="recipe._id"
        style="margin:auto"
      >
        <recipe-item v-bind:recipe="recipe" v-on:del-recipe="deleteRecipe" />
      </b-col>
    </b-row>
    <br />
    <br />
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import RecipeItem from '@/components/RecipeItem.vue'
import auth from '../store/modules/auth'
import toast from '../assets/toast'

export default {
  name: 'recipes',
  components: {
    RecipeItem
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real recipes from the server
    Api.get('/recipes')
      .then(response => {
        // console.log(response.data)
        this.recipes = response.data.recipes
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.recipes = []
        // TODO: display error message
      })
      .then(() => {
        //   This code is always executed at the end. After success or failure.
      })
  },
  data() {
    return {
      recipes: [],
      message: '',
      text: '',
      search: '',
      selected: 'internal',
      options: [
        { value: 'internal', text: 'Posted By User' },
        { value: 'external', text: 'From The Web' }
      ]
    }
  },
  methods: {
    deleteRecipe(id) {
      Api.delete(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.state.authToken}`
        }
      })
        .then(reponse => {
          const index = this.recipes.findIndex(recipe => recipe._id === id)
          this.recipes.splice(index, 1)
          toast.success('Recipe has been deleted')
        })
        .catch(error => {
          console.error(error)
        })
    },
    getExternalRecipe() {
      console.log('running')
      Api.get(`/external/recipes?query=${this.search}`
      ).then(res => {
        console.log(res.data)
      })
    }
  },
  computed: {
    filteredRecipes: function () {
      return this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
.f-in-put {
  margin-bottom: 5rem;
}
</style>
