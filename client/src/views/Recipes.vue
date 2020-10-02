<template>
    <b-container>
      <p class="red">{{message}}</p>
      <b-row>
        <b-col cols="7" offset="1" offset-md="2">
          <b-form-input v-model="text" placeholder="Search Recipe"></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-button v-on:click="createRecipe">Create New</b-button>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="12" sm="6" md="4" v-for="recipe in recipes" v-bind:key="recipe._id">
            <recipe-item v-bind:recipe="recipe" v-on:del-recipe="deleteRecipe"/>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
import RecipeItem from '@/components/RecipeItem.vue'

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
      text: ''
    }
  },
  methods: {
    deleteRecipe(id) {
      Api.delete(`/recipes/${id}`)
        .then(reponse => {
          const index = this.recipes.findIndex(recipe => recipe._id === id)
          this.recipes.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    createRecipe() {
      console.log(this.text)
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
