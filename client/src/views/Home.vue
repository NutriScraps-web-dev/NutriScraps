<template>
  <div>
    <div class="carouselContainer" v-if="recipes.length !== 0">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333; max-height:490px !important;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
          <b-carousel-slide
            style="max-height:490px !important;"
            :caption="getRecipeTitle(0)"
            :img-src="getRecipeImage(0)"
          ></b-carousel-slide>
          <b-carousel-slide
            style="max-height:490px !important;"
            :caption="getRecipeTitle(1)"
            :img-src="getRecipeImage(1)"
          ></b-carousel-slide>
          <b-carousel-slide
            :caption="getRecipeTitle(2)"
            :img-src="getRecipeImage(2)"
            style="max-height:490px !important;"
          ></b-carousel-slide>
          <b-carousel-slide
            :caption="getRecipeTitle(3)"
            :img-src="getRecipeImage(3)"
            style="max-height:490px !important;"
          ></b-carousel-slide>
          <b-carousel-slide
            :caption="getRecipeTitle(4)"
            :img-src="getRecipeImage(4)"
            style="max-height:490px !important;"
          ></b-carousel-slide>
      </b-carousel>
    </div>
    <br />
    <br />
    <h1 class="header"><b>Find your recipe</b></h1>
    <br />
    <br />
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
        this.recipes = response.data.recipes.recipes
        console.log(response.data.recipes.recipes)
      })
      .catch(error => {
        this.message = error.message
        this.recipes = []
        // TODO: display error message
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
      // console.log('see this', this.recipes[id])
      return this.recipes[id].title
    },
    getRecipeImage(id) {
      return 'https://spoonacular.com/recipeImages/' + this.recipes[id].id + '-636x393.jpg'
    }
  }
}
</script>

<style scoped>
.header {
  text-align: center;
}
.carouselContainer {
  max-height: 490px !important;
}
</style>
