<template>
  <b-container class="mt-3 form-container">
      <br>
      <h1><b>{{this.recipe.title}}</b></h1>
      <br>
      <b-img class="mb-4" :src="this.recipe.image"
      rounded
      fluid alt="Responsive image">
      </b-img>
      <div>
      <h3><b>Dish Type:</b></h3>
      <br>
      <div class=preparation>
            <ol>
                <li v-for="(dish, index) in this.recipe.dishTypes" :key="index">
                    <h4>{{dish || ''}}</h4>
                </li>
            </ol>
        </div>
      <br>
      <hr>
      </div>
      <br>
      <h3><b>Ingredients:</b></h3>
      <br>
      <div class=preparation>
            <ol>
                <li v-for="Ingredient in this.recipe.extendedIngredients" :key="Ingredient.id">
                    <h4>{{Ingredient.name}}</h4>
                    <p>amount: {{Ingredient.amount}} {{Ingredient.measures.metric.unitShort}}</p>
                </li>
            </ol>
        </div>
      <br>
      <hr>
      <br>
      <h3><b>instructions:</b></h3>
      <br>
        <span v-html="this.recipe.instructions"></span>
      <br>
      <hr>
      <br>
      <h3><b>Summary:</b></h3>
      <br>
        <span v-html="this.recipe.summary"></span>
      <br>
      <hr>
      <br>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'webRecipe',
  data() {
    return {
      recipe: ''
    }
  },
  mounted() {
    Api.get(`/external/recipes/info/${this.$route.params.id}`)
      .then(response => {
        console.log(response.data.recipes)
        this.recipe = response.data.recipes
      })
  }
}
</script>
