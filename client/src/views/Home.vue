<template>
<div>
  <div class="carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        :caption="getRecipeTitle(0)"
        :img-src="getRecipeImage(0)"
      ></b-carousel-slide>
      <b-carousel-slide
        :caption="getRecipeTitle(1)"
        :img-src="getRecipeImage(1)"
      ></b-carousel-slide>
      <b-carousel-slide
        :caption="getRecipeTitle(2)"
        :img-src="getRecipeImage(2)"
      ></b-carousel-slide>
      <b-carousel-slide
        :caption="getRecipeTitle(3)"
        :img-src="getRecipeImage(3)"
      ></b-carousel-slide>
      <b-carousel-slide
        :caption="getRecipeTitle(4)"
        :img-src="getRecipeImage(4)"
      ></b-carousel-slide>

    </b-carousel>
  </div>
    <br>
    <br>
    <h1 class="header"><b>Find your recipe</b></h1>
    <br>
    <br>
    <recipes></recipes>
  </div>
</template>

<script>
import Recipes from './Recipes'
import { Api } from '@/Api'

export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      recipes: []
    }
  },
  mounted() {
    Api.get('/search')
      .then(response => {
        console.log(response.data)
        this.recipes = response.data.recipes
        console.log(this.recipes)
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
  components: {
    Recipes
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    getRecipeTitle(id) {
      return this.recipes.recipes[id].title
    },
    getRecipeImage(id) {
      return 'https://spoonacular.com/recipeImages/' + this.recipes.recipes[id].id + '-636x393.jpg'
    }
  }
}
</script>

<style scoped>
.header{
  text-align: center;
}
.carousel {
  margin:auto;
  min-height:90%;
}

</style>
