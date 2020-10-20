<template>
  <b-container>
    <b-row>
      <b-col cols="8" offset="1" offset-md="2" style="margin:auto">
        <b-form @submit.prevent="getExternalRecipe">
          <b-input-group class="mb-2">
            <b-form-input
              type="search"
              v-model="search"
              placeholder="Search Recipes"
            ></b-form-input>
            <b-input-group-prepend>
              <b-button type="submit" variant="outline-secondary">
                <b-icon icon="search" aria-label="Help"></b-icon>
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
          <b-form-checkbox v-model="checked" switch>
            Include Recipes From The Web
          </b-form-checkbox>
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
        <recipe-item v-bind:recipe="recipe" />
      </b-col>
    </b-row>
    <b-row align-h="center" style="margin:auto">
      <b-col
        cols="12"
        sm="6"
        md="4"
        v-for="webrecipe in webRecipes"
        v-bind:key="webrecipe._id"
        style="margin:auto"
      >
        <web-recipe-items :recipe="webrecipe" />
      </b-col>
    </b-row>
    <br />
    <br />
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import RecipeItem from '@/components/RecipeItem.vue'
import webRecipeItems from '@/components/webRecipeItems.vue'
import auth from '../store/modules/auth'
import toast from '../assets/toast'

export default {
  name: 'recipes',
  components: {
    RecipeItem,
    webRecipeItems
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
      checked: false,
      webRecipes: []
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
      if (this.checked) {
        Api.get(`/external/recipes?query=${this.search}`).then(res => {
          this.webRecipes = res.data.recipes.results
          console.log('running', this.webRecipes)
        })
      } else {
        this.webRecipes = []
      }
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
