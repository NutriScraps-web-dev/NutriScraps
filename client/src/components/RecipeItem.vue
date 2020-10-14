<template>
  <div>
  <b-card
    img-src="https://st.depositphotos.com/1692343/5094/i/450/depositphotos_50945415-stock-photo-healthy-homemade-fried-rice.jpg"
    img-alt="Image"
    img-top
    tag="article"
    footer="options"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text class=text-body>
      <h4 class="recipe-name"><b>{{recipe.name}}</b></h4>
      <h6><i>Cuisine: {{recipe.cuisine}}</i></h6>
      <h6><i>Type: {{recipe.type}}</i></h6>
    </b-card-text>
    <b-card-body class="text-center">
      <b-button variant="primary" style="margin:auto" @click="goToRecipe(recipe._id)">
        View Recipe
      </b-button>
      <b-button href="#" variant="danger" style="margin:auto" v-on:click="deleteRecipe()">Delete Recipe</b-button>
    </b-card-body>
  </b-card>
</div>
</template>

<script>

export default {
  name: 'recipe-item',
  props: ['recipe'],
  methods: {
    deleteRecipe() {
      this.$emit('del-recipe', this.recipe._id)
      console.log('del-recipe with id:' + this.recipe._id)
    },
    goToRecipe() {
      this.$router.push({ name: 'recipe', params: { id: this.recipe._id } })
    }
  }

}

</script>

<style scoped>
.text-body{
  width: 100%;
  height: fit-content;
  text-overflow: ellipsis;
}
.recipe-name {
  text-overflow: ellipsis;
  max-width: 20ch;
}
</style>
