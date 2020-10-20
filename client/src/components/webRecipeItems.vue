<template>
  <span>
    <b-card
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text class="text-body">
        <h4 class="recipe-name">
          <b>{{ recipe.title }}</b>
        </h4>
      </b-card-text>
      <b-card-body class="text-center">
        <b-button
          variant="primary"
          style="margin:auto"
          @click="goToRecipe(recipe._id)"
        >
          View Recipe
        </b-button>
      </b-card-body>
    </b-card>
  </span>
</template>

<script>
export default {
  props: ['recipe'],
  methods: {
    goToRecipe() {
      console.log('this.recipe.id', this.recipe.id)
      this.$router.push({ name: 'webRecipe', params: { id: this.recipe.id } })
    }
  }
}
</script>

<style scoped>
.text-body {
  width: 100%;
  height: fit-content;
  text-overflow: ellipsis;
}
.recipe-name {
  text-overflow: ellipsis;
  max-width: 20ch;
}
</style>
